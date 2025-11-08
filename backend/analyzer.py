# modelo_moldes_ms.py
import mindspore as ms
from mindspore import nn, Tensor, context
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
from dataset_treino import planos, moldes  # 👈 importa o dataset

# Configuração do ambiente MindSpore
context.set_context(mode=context.PYNATIVE_MODE, device_target="CPU")

# Vetorização
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(planos).toarray()

# Convertendo para Tensor MindSpore
X_tensor = Tensor(X, dtype=ms.float32)

# Codificando rótulos
classes = list(set(moldes))
label_to_idx = {label: i for i, label in enumerate(classes)}
y = np.array([label_to_idx[m] for m in moldes], dtype=np.int32)
y_tensor = Tensor(y, dtype=ms.int32)

# Modelo de rede neural simples
class ModeloMoldes(nn.Cell):
    def __init__(self, input_dim, num_classes):
        super(ModeloMoldes, self).__init__()
        self.fc1 = nn.Dense(input_dim, 32)
        self.relu = nn.ReLU()
        self.fc2 = nn.Dense(32, num_classes)

    def construct(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

modelo = ModeloMoldes(X_tensor.shape[1], len(classes))

# Função de perda e otimizador
loss_fn = nn.SoftmaxCrossEntropyWithLogits(sparse=True)
optimizer = nn.Adam(modelo.trainable_params(), learning_rate=0.01)

# Treinamento
for epoch in range(300):
    logits = modelo(X_tensor)
    loss = loss_fn(logits, y_tensor)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    if epoch % 50 == 0:
        print(f"Epoch {epoch}, Loss: {loss.asnumpy()}")

# Salvar modelo e vetorizador
ms.save_checkpoint(modelo, "modelo_moldes.ckpt")
joblib.dump(vectorizer, "vetorizador.pkl")
joblib.dump(classes, "classes.pkl")

print("✅ Modelo MindSpore treinado e salvo com sucesso!")
