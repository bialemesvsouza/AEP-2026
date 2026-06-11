from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
import re



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

Base.metadata.create_all(bind=engine)

class DoacaoRequest(BaseModel):
    usuario_id: int
    ponto_coleta: str
    descricao: str

class ResgateRequest(BaseModel):
    usuario_id: int
    custo: int
    recompensa: str


#  MOTOR DE INTELIGÊNCIA ARTIFICIAL (Expressões Regulares / NLP)

def analisar_doacao_ia(descricao: str):

    descricao = descricao.lower()
    pontos_base = 10
    
    # REGRA 1: Frio Extremo (Prioridade Máxima)
    if re.search(r'\b(agasalho|casaco|cobertor|lã|frio|moletom|blusa)\b', descricao):
        return pontos_base * 2, 2, "Alta demanda por frio extremo detectada pela IA (+100% Pontos)"
    
    # REGRA 2: Alimentação Básica (Prioridade Alta)
    elif re.search(r'\b(água|alimento|comida|arroz|feijão|macarrão|leite|óleo)\b', descricao):
        return int(pontos_base * 1.5), 1, "Item essencial em escassez detectado pela IA (+50% Pontos)"
    
    # REGRA 3: Demanda Padrão
    else:
        return pontos_base, 1, "Doação padrão registrada. Agradecemos a colaboração!"


app = FastAPI(title="DoaMais API", description="API com SQLAlchemy e IA")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/usuarios/{usuario_id}")
def get_usuario(usuario_id: int):
    db = SessionLocal()
    user = db.query(Usuario).filter(Usuario.id == usuario_id).first()
    
    if not user:
        user = Usuario(nome="Lucas Martins", email="lucas@email.com", pontos=147, doacoes=23, peso_doado=18, familias_ajudadas=5)
        db.add(user)
        db.commit()
        db.refresh(user)
    db.close()
    return user

@app.post("/doacoes")
def registrar_doacao(req: DoacaoRequest):
    db = SessionLocal()
    user = db.query(Usuario).filter(Usuario.id == req.usuario_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="Usuário não encontrado")


    pontos_ganhos, peso_estimado, analise_ia = analisar_doacao_ia(req.descricao)


    user.pontos += pontos_ganhos
    user.doacoes += 1
    user.peso_doado += peso_estimado
    user.familias_ajudadas += 1
    
    db.commit()
    db.refresh(user)
    db.close()
    
    return {
        "mensagem": "Doação registrada com sucesso!",
        "pontos_ganhos": pontos_ganhos,
        "analise_ia": analise_ia,
        "usuario": user
    }


@app.post("/recompensas/resgatar")
def resgatar_recompensa(req: ResgateRequest):
    db = SessionLocal()
    user = db.query(Usuario).filter(Usuario.id == req.usuario_id).first()
    
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    if user.pontos < req.custo:
        db.close()
        raise HTTPException(status_code=400, detail="Pontos insuficientes")
        
    user.pontos -= req.custo
    db.commit()
    db.refresh(user)
    db.close()
    
    return {"mensagem": f"Resgate de '{req.recompensa}' efetuado com sucesso!", "usuario": user}