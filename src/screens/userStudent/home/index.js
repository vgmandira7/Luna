import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import styles from "./style/style";

import testPerfil from "../../../assets/assets-home/PerfilTest.png";
import temporyMenu from "../../../assets/assets-home/menu.png";
import LogoLuna from "../../../assets/luna.png";
import seta from "../../../assets/assets-home/seta.png";
import buttonIcon from "../../../assets/assets-home/botaoIcone.png";
import Luna3d from "../../../assets/luna3d.png";
import { useNavigation } from "@react-navigation/native";

import portuguesImg from "../../../assets/assets-home/portugues.png";
import matematicaImg from "../../../assets/assets-home/matematica.png";
import geografiaImg from "../../../assets/assets-home/geografia.png";

import { MateriaCard } from "../../../components/materiaCard/index";

export default function App({ route }) {
  const navigation = useNavigation();

  const { userId, tipoUser } = route.params || {};
  const [aluno, setAluno] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);


  function materiaPreset(nome) {
    const n = (nome || "").toLowerCase();

    if (n.includes("port")) {
      return {
        title: "Língua Portuguesa",
        image: portuguesImg,
        backgroundColor: "#E9F7F6",
        buttonColor: "#0F766E",
      };
    }

    if (n.includes("mat")) {
      return {
        title: "Matemática",
        image: matematicaImg,
        backgroundColor: "#E6ECFF",
        buttonColor: "#1E3A8A",
      };
    }

    if (n.includes("geo")) {
      return {
        title: "Geografia",
        image: geografiaImg,
        backgroundColor: "#FFDDD2",
        buttonColor: "#71270F",
      };
    }

   
    return {
      title: nome,
      image: geografiaImg,
      backgroundColor: "#EFEFEF",
      buttonColor: "#333",
    };
  }


  function formatNumber(i) {
    const n = String(i + 1).padStart(2, "0");
    return `${n}.`;
  }

  useEffect(() => {
    async function carregarTudo() {
      try {
        if (!userId) {
          console.log("❌ Sem userId vindo do login");
          return;
        }

        // busca aluno
        const respAluno = await fetch(`http://192.168.1.73:8000/aluno/${userId}`);
        const dataAluno = await respAluno.json();
        console.log("DADOS ALUNO:", dataAluno);

        if (!dataAluno.ok) {
          console.log("❌", dataAluno.message);
          return;
        }

        setAluno(dataAluno.aluno);

        const escolaID = dataAluno.aluno?.escolaID;
        if (!escolaID) {
          console.log("❌ aluno sem escolaID");
          return;
        }

       
        const respMat = await fetch(`http://192.168.1.73:8000/materias/${escolaID}`);
        const dataMat = await respMat.json();
        console.log("MATERIAS:", dataMat);

        if (dataMat.ok) {
          // transforma o retorno do banco em cards padronizados
        const cards = (dataMat.materias || []).map((m, idx) => {
          const preset = materiaPreset(m.nome);

          return {
            id: m.id,                      
            number: formatNumber(idx),
            title: preset.title,
            nome: m.nome,                   
            image: preset.image,
            backgroundColor: preset.backgroundColor,
            buttonColor: preset.buttonColor,
            rota: m.rota || "Atividades",
          };
        });

          setMaterias(cards);
        }
      } catch (e) {
        console.log("ERRO:", e);
      } finally {
        setLoading(false);
      }
    }

    if (tipoUser === "aluno") carregarTudo();
    else setLoading(false);
  }, [userId, tipoUser]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.navbar}>
        <Image style={styles.menu} source={temporyMenu} />
        <Image
          style={styles.profilePhoto}
          source={aluno?.urlFotoAluno ? { uri: aluno.urlFotoAluno } : testPerfil}
        />
      </View>

      <View style={styles.body}>
        <View style={styles.spaceLogo}>
          <Image source={LogoLuna} style={styles.logo} />
        </View>

        <View style={styles.spaceNameUsuario}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.nameUsuario}>
              Olá, {aluno?.nome || "Usuário"}
            </Text>
          )}
        </View>

        <View style={styles.spaceHiperfocoAux}>
          <View style={styles.spaceHiperfoco}>
            <Text style={styles.textoHiperfoco}>
              Indique o hiperfoco {"\n"}da criança aqui!
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Image source={seta} style={styles.imageSeta} />

              <TouchableOpacity style={styles.bottonHiperfoco}>
                <Image source={buttonIcon} style={{ width: 33, height: 33 }} />
              </TouchableOpacity>

              <Image source={Luna3d} style={styles.luna3d} />
            </View>
          </View>
        </View>

        <View style={styles.spaceMaterias}>
          <View style={styles.spaceTituloMaterias}>
            <Text style={styles.textMaterias}>Matérias</Text>
            <Text style={styles.textVejamais}>Veja mais →</Text>
          </View>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 16 }}
            >
              {materias.map((materia) => (
                <MateriaCard
                  key={materia.id}
                  {...materia}
               onPress={() =>
                navigation.navigate("Atividades", {
                  materiaId: materia.id,      
                  materiaNome: materia.nome,  
                  userId,
                })
              }
                />
              ))}
            </ScrollView>
          )}
        </View>

        {!loading && aluno && (
          <View style={{ paddingBottom: 30 }}>
            <Text>RA: {aluno.RA}</Text>
            <Text>Turma: {aluno.turmaID}</Text>
            <Text>Escola: {aluno.escolaID}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}