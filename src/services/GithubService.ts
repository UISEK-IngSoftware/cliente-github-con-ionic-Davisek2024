import axios from "axios";
import { RepositoryItem } from "../interfaces/Repositoryitem";
import { UserInfo } from "../interfaces/UserInfo";


const GITHUB_API_URL = import.meta.env.VITE_API_URL;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

export const fetchUserRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}user/repos`,{
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
            params: {
                per_page: 100,
                sort:"created",
                direction:"desc",
            },
        });
        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description ? repo.description : null,
            imageUrl: repo.owner?repo.owner.avatar_url : null,
            owner: repo.owner?repo.owner.login : null,
            language: repo.language ? repo.language : null,
        }));

        return repositories;
    }
    catch (error) {
        console.error("Hubo un error al obtener los repositorios:", error);
        return [];
    }
}


export const createRepository = async (repo:RepositoryItem):Promise<void> => {
    try {
        const response = await axios.post(`${GITHUB_API_URL}user/repos`,repo, {
            headers:{
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
        });
        console.log("Repositorio creado con éxito:", response.data);
    } catch (error) {
        console.error("Hubo un error al crear el repositorio:", error);
    }
};


export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}user`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
    });

    const userInfo: UserInfo = {
      login: response.data.login,
      name: response.data.name,
      bio: response.data.bio,
      avatar_url: response.data.avatar_url,
    };

    return userInfo;
  } catch (error) {
    console.error(
      "Hubo un error al obtener la información del usuario:",
      error
    );

    const userInfo: UserInfo = {
      login: "undefined",
      name: "Usuario no encontrado",
      bio: "No se pudo obtener la información del usuario.",
      avatar_url:"https://i.pinimg.com/474x/fd/a2/cf/fda2cf3e77d27da8df62ea99baf8cf6c.jpg",
    };

    return userInfo;
  }
};