import apiClient from "@/utils/api";



export async function Voice(req: any): Promise<Omit<AuthResponse, 'user'> | null> {
    try {
        const response = await apiClient.post<{ data: Omit<AuthResponse, 'user'> }>("/recognize", req);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
