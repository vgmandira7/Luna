# classificador_ms.py
import mindspore as ms
from mindspore import Tensor, context
import numpy as np
import joblib
from analyser import ModeloMoldes  # 👈 importa o modelo treinado no analyser
import os

# Configuração do ambiente MindSpore
context.set_context(mode=context.PYNATIVE_MODE, device_target="CPU")

# Carregar vetorizador e classes
vectorizer = joblib.load("vetorizador.pkl")
classes = joblib.load("classes.pkl")

# Criar a instância do modelo
modelo = ModeloMoldes(vectorizer.transform([""]).shape[1], len(classes))

# Carregar pesos treinados
param_dict = ms.load_checkpoint("modelo_moldes.ckpt")
ms.load_param_into_net(modelo, param_dict)


# Função: escolhe o molde com base no plano e hiperfoco
def escolher_molde(plano_texto, hiperfoco):
    entrada = plano_texto + " " + hiperfoco
    X = vectorizer.transform([entrada]).toarray()
    X_tensor = Tensor(X, dtype=ms.float32)
    preds = modelo(X_tensor)
    pred_idx = int(np.argmax(preds.asnumpy()))
    molde_previsto = classes[pred_idx]
    return molde_previsto


# Função: gera o prompt para IA generativa
def gerar_prompt(molde, hiperfoco):
    temas = {
        "flappy_quiz": "um jogo interativo estilo flappy bird, onde a criança passa pelos canos com a resposta certa",
        "game_quiz": "um quiz divertido com perguntas e respostas sobre o conteúdo do plano",
        "narrative": "uma história narrada com personagens e perguntas ao final"
    }
    base = temas.get(molde, "uma atividade educacional criativa e interativa")
    return f"Crie {base}, adaptado ao hiperfoco em {hiperfoco}."


# Execução principal
if __name__ == "__main__":
    plano_path = "uploads/plano_aula_2ano.txt"

    if not os.path.exists(plano_path):
        raise FileNotFoundError(f"O arquivo {plano_path} não foi encontrado.")

    # Ler o plano de aula do TXT
    with open(plano_path, "r", encoding="utf-8") as f:
        plano = f.read()

    hiperfoco = "games"

    # Escolher molde e gerar prompt
    molde = escolher_molde(plano, hiperfoco)
    prompt = gerar_prompt(molde, hiperfoco)

    print("\n🧠 Molde escolhido:", molde)
    print("\n🎨 Prompt gerado para IA generativa:\n")
    print(prompt)
