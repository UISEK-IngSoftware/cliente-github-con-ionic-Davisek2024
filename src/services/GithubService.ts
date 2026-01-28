import axios, { type AxiosError } from "axios";
import { RepositoryItem } from "../interfaces/Repositoryitem";
import { UserInfo } from "../interfaces/Userinfo";
import AuthService from "./AuthService";


const GITHUB_API_URL = import.meta.env.VITE_API_URL;
const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use((config) => {
  const authHeader = AuthService.getAuthHeaders();
  if (authHeader) {
    config.headers.Authorization = authHeader.Authorization;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const fetchUserRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get(`/user/repos`,{
            params: {
                per_page: 100,
                sort:"created",
                direction:"desc",
                timestamp: Date.now()
            },
        });
        const repositories: RepositoryItem[] = response.data.map((repo: { name: string; description: string | null; owner?: { avatar_url?: string; login?: string } | null; language?: string | null }) => ({
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
        const response = await githubApi.post(`/user/repos`,repo, {
        });
        console.log("Repositorio creado con éxito:", response.data);
    } catch (error) {
        console.error("Hubo un error al crear el repositorio:", error);
    }
};


export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const response = await githubApi.get(`/user`, {
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


export const updateRepository = async (owner: string, repoName: string, data: { name?: string; description?: string | null; }): Promise<Record<string, unknown> | null> => {
  try {
    console.log(`PATCH /repos/${owner}/${repoName} payload:`, data);
    const response = await githubApi.patch(`/repos/${owner}/${repoName}`, data);
    console.log('Repositorio actualizado (status):', response.status, response.data);
    
    return response.data as Record<string, unknown>;
  } catch (error: unknown) {
    console.error('Hubo un error al actualizar el repositorio:', error);
    const err = error as AxiosError | undefined;
    if (err && err.response) {
      console.error('Error response (status, data):', err.response.status, err.response.data);
      
      return (err.response.data as Record<string, unknown>) ?? null;
    }
    return null;
  }
};

export const deleteRepository = async (owner: string, repoName: string): Promise<boolean> => {
  try {
    await githubApi.delete(`/repos/${owner}/${repoName}`);
    console.log('Repositorio eliminado:', `${owner}/${repoName}`);
    return true;
  } catch (error) {
    console.error('Hubo un error al eliminar el repositorio:', error);
    return false;
  }
};