from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker, Session
import re
import difflib
from datetime import datetime



# Para rodar o backend 
# uvicorn main:app --host 0.0.0.0 --port 8000



SQLALCHEMY_DATABASE_URL = "sqlite:///./doamais.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    pontos = Column(Integer, default=0)
    doacoes = Column(Integer, default=0)
    peso_doado = Column(Integer, default=0)
    familias_ajudadas = Column(Integer, default=0)

class Historico(Base):
    __tablename__ = "historico"
    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(Integer, index=True)
    tipo = Column(String)
    titulo = Column(String)
    pontos = Column(String)
    data = Column(String)

class ItemLoja(Base):
    __tablename__ = "itens_loja"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    descricao = Column(String)
    custo_pontos = Column(Integer)
    icone = Column(String)
    tipo_icone = Column(String)

class Alerta(Base):
    __tablename__ = "alertas"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String)
    descricao = Column(String)

Base.metadata.create_all(bind=engine)

def popular_banco_inicial():
    db = SessionLocal()
    if db.query(ItemLoja).count() == 0:
        db.add_all([
            ItemLoja(nome="15% Off Hortifruti", descricao="Válido no Supermercado Central", custo_pontos=50, icone="food-apple-outline", tipo_icone="MaterialCommunityIcons"),
            ItemLoja(nome="Passe Livre Urbano", descricao="2 passagens de ônibus grátis", custo_pontos=100, icone="bus", tipo_icone="MaterialCommunityIcons"),
            ItemLoja(nome="30% Off Livraria", descricao="Apoie o comércio local de livros", custo_pontos=200, icone="book", tipo_icone="Feather"),
            ItemLoja(nome="Café Artesanal", descricao="Um café grátis na padaria local", custo_pontos=300, icone="coffee", tipo_icone="Feather")
        ])
    if db.query(Alerta).count() == 0:
        db.add_all([
            Alerta(titulo="Frio Extremo", descricao="A IA detectou queda na temperatura. Roupas de frio valem 2x pontos."),
            Alerta(titulo="Baixo Estoque", descricao="Alimentos não perecíveis estão em falta. Doações valem 1.5x pontos.")
        ])
    if db.query(Usuario).count() == 0:
        user = Usuario(nome="Lucas Martins", email="lucas@email.com", pontos=147, doacoes=23, peso_doado=18, familias_ajudadas=5)
        db.add(user)
        
    db.commit()
    db.close()

popular_banco_inicial()


class DoacaoRequest(BaseModel):
    usuario_id: int
    ponto_coleta: str
    descricao: str

class ResgateRequest(BaseModel):
    usuario_id: int
    item_id: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def obter_data_formatada():
    meses = ["", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    agora = datetime.now()
    return f"{agora.day:02d} {meses[agora.month]} {agora.year}"


def analisar_doacao_ia(descricao: str):
    palavras = descricao.lower().split()
    pontos_base = 10
    
    frio_keywords = ['agasalho', 'casaco', 'cobertor', 'lã', 'frio', 'moletom', 'blusa']
    alimento_keywords = ['água', 'alimento', 'comida', 'arroz', 'feijão', 'macarrão', 'leite', 'óleo']
    
    for palavra in palavras:
        if difflib.get_close_matches(palavra, frio_keywords, n=1, cutoff=0.8):
            return pontos_base * 2, 2, "Alta demanda por frio (IA corrigiu/detectou o item) +100% Pontos"
        if difflib.get_close_matches(palavra, alimento_keywords, n=1, cutoff=0.8):
            return int(pontos_base * 1.5), 1, "Item essencial em escassez (IA detectou o item) +50% Pontos"
            
    return pontos_base, 1, "Doação padrão registrada. Agradecemos a colaboração!"

# --- INÍCIO DA API ---
app = FastAPI(title="DoaMais API Protótipo")

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

@app.get("/usuarios/{usuario_id}")
def get_usuario(usuario_id: int, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

@app.get("/alertas")
def listar_alertas(db: Session = Depends(get_db)):
    return db.query(Alerta).all()

@app.get("/loja")
def listar_loja(db: Session = Depends(get_db)):
    return db.query(ItemLoja).all()

@app.get("/usuarios/{usuario_id}/historico")
def obter_historico(usuario_id: int, db: Session = Depends(get_db)):
    return db.query(Historico).filter(Historico.usuario_id == usuario_id).order_by(Historico.id.desc()).all()

@app.post("/doacoes")
def registrar_doacao(req: DoacaoRequest, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.id == req.usuario_id).first()
    if not user: raise HTTPException(status_code=404, detail="Usuário não encontrado")

    pontos_ganhos, peso_estimado, analise_ia = analisar_doacao_ia(req.descricao)

    user.pontos += pontos_ganhos
    user.doacoes += 1
    user.peso_doado += peso_estimado
    user.familias_ajudadas += 1
    
    db.add(Historico(usuario_id=user.id, tipo="doacao", titulo=req.descricao, pontos=f"+{pontos_ganhos}", data=obter_data_formatada()))
    db.commit()
    db.refresh(user)
    
    return {"mensagem": "Doação registrada com sucesso!", "pontos_ganhos": pontos_ganhos, "analise_ia": analise_ia, "usuario": user}

@app.post("/recompensas/resgatar")
def resgatar_recompensa(req: ResgateRequest, db: Session = Depends(get_db)):
    user = db.query(Usuario).filter(Usuario.id == req.usuario_id).first()
    item = db.query(ItemLoja).filter(ItemLoja.id == req.item_id).first()
    
    if not user or not item: raise HTTPException(status_code=404, detail="Usuário ou Item não encontrado")
    if user.pontos < item.custo_pontos: raise HTTPException(status_code=400, detail="Pontos insuficientes")
        
    user.pontos -= item.custo_pontos
    db.add(Historico(usuario_id=user.id, tipo="resgate", titulo=item.nome, pontos=f"-{item.custo_pontos}", data=obter_data_formatada()))
    
    db.commit()
    db.refresh(user)
    return {"mensagem": f"Resgate de '{item.nome}' efetuado com sucesso!", "usuario": user}