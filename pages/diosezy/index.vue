<script setup>
import axios from "axios"
const modalajout = ref(false);
const modaledit = ref(false);
const data = ref([]);
const error = ref('');
const message = ref('');

const api = "http://localhost:5000";

const datainput = reactive({
    nom : "",
    filoha : ""
})

const dataedit = reactive({
    id : null,
    nom_diosezy : '',
    filoha : '',
})

const getData = async () => {
    try {
        const response = await axios.get(api + '/diosezy');
        data.value = response.data;
        
    } catch (error) {
        error.value = "Failed to load data";
        console.log(error);
    }
}

const InsertDiosezy = () => {
    try {
        const response = axios.post(api + '/diosezy/create', {
            nom_diosezy : datainput.nom,
            filoha : datainput.filoha
        });
        getData();
        message.value = "Insertion effectué avec succès !"
    } catch (error) {
        console.log(error);
    }
}

const UpdateDiosezy = () => {
    try {
        const response = axios.put(`${api}/diosezy/update/${dataedit.id}`, {
            nom_diosezy : dataedit.nom_diosezy,
            filoha : dataedit.filoha
        });

        getData();

        message.value = "Modification effectué avec succès !"
    } catch (error) {
        console.log(error);
    }
}

const DeleteDiosezy = async (id) => {
    if(confirm('Etes-vous sûr de vouloir suppimer cette donnée ?')){
        try {
            axios.delete(`${api}/diosezy/delete/${id}`);
            getData();
            alert("Succès !!");
        } catch (error) {
            console.log(error);
        }
    }
}

const OpenEditForm = (item) => {
    dataedit.id = item.id;
    dataedit.nom_diosezy = item.nom_diosezy;
    dataedit.filoha = item.filoha;
}

onMounted(() => {
    getData();
})

</script>
<template>
    <div class="p-4 w-full">
        <div>
            <div class="py-2 bg-white px-4 flex justify-between items-center">
                <ul class="flex text-sm text-gray-800 space-x-2">
                    <li><a href="">Tableau de bord</a></li>
                    <li>></li>
                    <li><a href="">diosezy</a></li>
                    <li>></li>
                    <li><a href="">listes</a></li>
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
                            Anarana
                        </td>
                        <td>
                            Filoha
                        </td>
                        <td>
                            Action
                        </td>
                    </tr>
                    <tbody>
                        <tr v-for="(diosezy, key) in data">
                            <td class="py-2">{{ key + 1}}</td>
                            <td>{{ diosezy.nom_diosezy}}</td>
                            <td>{{ diosezy.filoha }}</td>
                           
                            <td class="flex space-x-3 items-center py-2">
                                <button @click="DeleteDiosezy(diosezy.id)" class="px-3 py-1 rounded-md hover:bg-red-500 bg-red-600 text-white text-sm">Supprimer</button>
                                <button @click="OpenEditForm(diosezy); modaledit = !modaledit" class="px-3 py-1 rounded-md hover:bg-blue-500 bg-blue-600 text-white text-sm">Modifier</button>
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
                   <p class="font-semibold text-2xl text-center">Ajout diosezy</p>
                   <button @click="modalajout = !modalajout; message ='';">Fermer</button>
                </div>
                <div class="mt-10">
                    <div v-if="message" class="py-2 text-center bg-green-100 text-green-900">
                        {{ message }}
                    </div>
                    <form @submit.prevent="InsertDiosezy" class="space-y-2">
                        <div class="flex flex-col">
                            <label for="">Anarana</label>
                            <input v-model="datainput.nom" class="px-2 h-12 border border-gray-400 rounded-md" type="text" placeholder="Anaran'ny diosezy">
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
                    <form @submit.prevent="UpdateDiosezy" class="space-y-2">
                        <div class="flex flex-col">
                            <label for="">Anarana</label>
                            <input v-model="dataedit.nom_diosezy" class="px-2 h-12 border border-gray-400 rounded-md" type="text" placeholder="Anaran'ny diosezy">
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