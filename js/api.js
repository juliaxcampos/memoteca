const URL_BASE = "http://localhost:3000/"

const api = {
    async buscarPensamentos(){
        try {
            // axios é um substituto do fetch
            const response = await axios.get(`${URL_BASE}pensamentos`);
            return await response.data; 
        } catch (error) {
            alert("Erro ao buscar pensamentos");
            throw Error;
        }
    },

    async salvarPensamentos(pensamento){
        try {
            const response = await axios.post(`${URL_BASE}pensamentos`, pensamento);
            return await response.data;
        } catch (error) {
            alert("Erro ao salvar o pensamento");
            throw Error;
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${URL_BASE}pensamentos/${id}`);
            return await response.data;
        } catch (error) {
            alert ("Erro ao bucar pensamento");
            throw error;
        }
    },

    async editarPensamento(pensamento){
        try {
            const response = await axios.put(`${URL_BASE}pensamentos/${pensamento.id}`, pensamento);
            // com fetch    
            // {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type" : "application/json"
            //     },
            //     body: JSON.stringify(pensamento)
            // }
            // response.json();
        
            return await response.data;
        } catch (error) {
            alert("Erro ao editar o pensamento");
            throw Error;
        }
    }, 

    async excluirPensamento(id){
        try {
            await axios.delete(`${URL_BASE}pensamentos/${id}`);
        } catch (error) {
            alert("Erro ao excluir o pensamento");
            throw Error;
        }
    }    
}

export default api;