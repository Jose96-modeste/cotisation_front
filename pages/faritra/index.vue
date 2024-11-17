<script setup>
import axios from "axios"
const modalajout = ref(false);
const modaledit = ref(false);
const data = ref([]);
const diosezy = ref([]);
const error = ref('');
const message = ref('');

const api = "http://localhost:5000";

const datainput = reactive({
    nom_faritra : "",
    filoha : "",
    id_diosezy : "",
})

const dataedit = reactive({
    id : null,
    nom_faritra : '',
    filoha : '',
    id_diosezy:null,
})

const getData = async () => {
    try {
        const response = await axios.get(`${api}/faritra`);
        data.value = response.data;
        
    } catch (error) {
        error.value = "Failed to load data";
        console.log(error);
    }
}

const getDiosezy = async () => {
    try {
        const response = await axios.get(`${api}/diosezy`);
        diosezy.value = response.data;
    } catch (error) {
        error.value = "Failed to load data";
        console.log(error);
    }
}

const InsertFaritra = () => {
    try {
        const response = axios.post(`${api}/faritra/create`, {
            nom_faritra : datainput.nom_faritra,
            filoha : datainput.filoha,
            id_diosezy : datainput.id_diosezy
        });
        getData();
        message.value = "Insertion effectué avec succès !"
    } catch (error) {
        console.log(error);
    }
}

const UpdateFaritra = () => {
    try {
        const response = axios.put(`${api}/faritra/update/${dataedit.id}`, {
            nom_faritra : dataedit.nom_faritra,
            filoha : dataedit.filoha,
            id_diosezy: dataedit.id_diosezy
        });

        getData();

        message.value = "Modification effectué avec succès !"
    } catch (error) {
        console.log(error);
    }
}

const DeleteFaritra = async (id) => {
    if(confirm('Etes-vous sûr de vouloir suppimer cette donnée ?')){
        try {
            axios.delete(`${api}/faritra/delete/${id}`);
            getData();
            alert("Succès !!");
        } catch (error) {
            console.log(error);
        }
    }
}

const OpenEditForm = (item) => {
    dataedit.id = item.id;
    dataedit.nom_faritra = item.nom_faritra;
    dataedit.filoha = item.filoha;
    dataedit.id_diosezy = item.diosezy_id;
}

onMounted(() => {
    getDiosezy();
    getData();
})

</script>
<template>
    <div class="p-4 w-full">
        <div>
            <div class="py-2 bg-white px-4 flex justify-between items-center">
                <ul class="flex text-sm text-gray-800 space-x-2">
                    <li><a href="/">Tableau de bord</a></li>
                    <li>></li>
                    <li><a href="/faritra">faritra</a></li>
                    <li>></li>
                    <li><a href="/faritra">listes</a></li>
                </ul>
                <div>
                    <button @click="modalajout = !modalajout" class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md">Hampiditra</button>
                </div>
            </div>
        </div>
        <div>
            
            <div class="w-full mx-auto p-3 shadow-md rounded-md bg-white mt-[50px]">
                <table class="table w-full">
                    <tr class="bg-gray-200 font-semibold">
                        <td class="py-2">
                            ID
                        </td>
                        <td>
                            Faritra
                        </td>
                        <td>
                            Filoha
                        </td>
                        <td>
                            Diosezy
                        </td>
                        <td>
                            Action
                        </td>
                    </tr>
                    <tbody>
                        <tr v-for="(faritra, key) in data">
                            <td class="py-2">{{ key + 1}}</td>
                            <td>{{ faritra.nom_faritra}}</td>
                            <td>{{ faritra.filoha }}</td>
                            <td>{{ faritra.nom_diosezy }}</td>
                           
                            <td class="flex space-x-3 items-center py-2">
                                <button @click="DeleteFaritra(faritra.id)" class="px-3 py-1 rounded-md hover:bg-red-500 bg-red-600 text-white text-sm">Supprimer</button>
                                <button @click="OpenEditForm(faritra); modaledit = !modaledit" class="px-3 py-1 rounded-md hover:bg-blue-500 bg-blue-600 text-white text-sm">Modifier</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
 <div  v-if="modalajout" class="h-full w-full absolute top-0 bottom-0 left-0 right-0 bg-black/25">
    <div class="w-1/3 mx-auto p-3 shadow-md rounded-md bg-white mt-[50px]">
                <div class="flex justify-between items-center">
                   <p class="font-semibold text-2xl text-center">Ajout faritra</p>
                   <button @click="modalajout = !modalajout; message ='';">Fermer</button>
                </div>
                <div class="mt-10">
                    <div v-if="message" class="py-2 text-center bg-green-100 text-green-900">
                        {{ message }}
                    </div>
                    <form @submit.prevent="InsertFaritra" class="space-y-2">
                        <div class="flex flex-col">
                            <label for="">Faritra</label>
                            <input v-model="datainput.nom_faritra" class="px-2 h-12 border border-gray-400 rounded-md" type="text" placeholder="Faritra">
                        </div>

                        <div class="flex flex-col">
                            <label for="">Diosezy</label>
                            <select class="px-2 h-12 border border-gray-400 rounded-md" v-model="datainput.id_diosezy">
                                <option v-for="d in diosezy" :value="d.id">{{ d.nom_diosezy }}</option>
                            </select>
                        </div>

                        <div class="flex flex-col">
                            <label for="">Filoha</label>
                            <input v-model="datainput.filoha" class="px-2 h-12 border border-gray-400 rounded-md" type="text" placeholder="Anaran'ny filoha">
                        </div>
                        <div>
                            <button class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md" type="submit">Sauvegarder</button>
                        </div>
                    </form>
                </div>
            </div>
 </div>

 <div  v-if="modaledit" class="h-full w-full absolute top-0 bottom-0 left-0 right-0 bg-black/25">
    <div class="w-1/3 mx-auto p-3 shadow-md rounded-md bg-white mt-[50px]">
                <div class="flex justify-between items-center">
                   <p class="font-semibold text-2xl text-center">Modification diosezy</p>
                   <button @click="modaledit = !modaledit; message = ''">Fermer</button>
                </div>
                <div class="mt-10">
            
                    <div v-if="message" class="py-2 text-center bg-green-100 text-green-900">
                        {{ message }}
                    </div>
                    <form @submit.prevent="UpdateFaritra" class="space-y-2">
                        <div class="flex flex-col">
                            <label for="">Faritra</label>
                            <input v-model="dataedit.nom_faritra" class="px-2 h-12 border border-gray-400 rounded-md" type="text" placeholder="Anaran'ny diosezy">
                        </div>
                        <div class="flex flex-col">
                            <label for="">Diosezy</label>
                            <select v-model="dataedit.id_diosezy" class="px-2 h-12 border border-gray-400 rounded-md" >
                                <option :selected="dataedit.id_diosezy == d.id" v-for="d in diosezy" :value="d.id" :key="d.id">{{ d.nom_diosezy }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col">
                            <label for="">Filoha</label>
                            <input v-model="dataedit.filoha" class="px-2 h-12 border border-gray-400 rounded-md" type="text" placeholder="Anaran'ny filoha">
                        </div>
                        <div>
                            <button class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md" type="submit">Mis à jour</button>
                        </div>
                    </form>
                </div>
            </div>
 </div>
</template>