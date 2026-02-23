from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from bson import ObjectId

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient(
    "mongodb+srv://Vitor:admin@projetointegrador.uxu3ymo.mongodb.net/?appName=ProjetoIntegrador"
)

db = client["ProjetoIntegrador"]
usuarios = db["usuarios"]
alunos = db["alunos"]
materias = db["materias"]  # ✅ NOVO: coleção materias


class LoginRequest(BaseModel):
    email: str
    senha: str


@app.post("/login")
def login(payload: LoginRequest):
    user = usuarios.find_one({"email": payload.email, "senha": payload.senha})

    if not user:
        return {"ok": False, "message": "Email ou senha inválidos"}

    return {
        "ok": True,
        "tipoUser": user.get("tipoUser", "aluno"),
        "userId": str(user["_id"]),
    }


@app.get("/aluno/{user_id}")
def get_aluno(user_id: str):
    aluno = alunos.find_one({"userID": user_id}, {"_id": 0})

    # se userID em alunos estiver como ObjectId, tenta assim também
    if not aluno:
        try:
            aluno = alunos.find_one({"userID": ObjectId(user_id)}, {"_id": 0})
        except:
            aluno = None

    if not aluno:
        return {"ok": False, "message": "Aluno não encontrado para esse userID"}

    return {"ok": True, "aluno": aluno}


@app.get("/materias/{escola_id}")
def get_materias_por_escola(escola_id: str):
    lista = list(
        materias.find(
            {"escolaID": escola_id},
            {"_id": 0, "idMateria": 1, "nome": 1, "rota": 1}
        )
    )

    return {"ok": True, "materias": lista}