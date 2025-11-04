
import joblib

modelo = joblib.load("modelo_moldes.pkl")
vectorizer = joblib.load("vetorizador.pkl")

def escolher_molde(plano, hiperfoco):
    entrada = plano + " " + hiperfoco
    X = vectorizer.transform([entrada])
    molde_previsto = modelo.predict(X)[0]
    return molde_previsto

def gerar_prompt(molde, hiperfoco):
    temas = {
        "jogo_interativo_basico": "um fundo colorido estilo videogame infantil",
        "historia_rimada_musical": "um cenário com notas musicais e livros abertos",
        "aventura_dos_animais": "um fundo de floresta com animais simpáticos",
        "arte_colorida": "um fundo artístico com pincéis e tintas coloridas",
        "jogo_matematico": "um fundo com números flutuando e tabuleiros"
    }
    base = temas.get(molde, "um fundo educativo e alegre para crianças")
    return f"Crie {base}, relacionado ao hiperfoco em {hiperfoco}."


if __name__ == "__main__":
    plano = "Desenhar e pintar formas geométricas"
    hiperfoco = "musica"

    molde = escolher_molde(plano, hiperfoco)
    prompt = gerar_prompt(molde, hiperfoco)

    print("🧠 Molde escolhido:", molde)
    print("🎨 Prompt para IA generativa:")
    print(prompt)
