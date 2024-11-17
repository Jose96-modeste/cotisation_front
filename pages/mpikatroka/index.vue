<script setup>
import axios from "axios"

const modalajout = ref(false);
const modaledit = ref(false);
const data = ref([]);
const fivondronana = ref([]);
const categories = ref([]);
const error = ref('');
const message = ref('');
const annee = ref(2024);

const api = "http://localhost:5000";

const datainput = reactive({
    nom_mpikatroka :"", 
    id_fivondronana :null, 
    id_categorie :null
})

const dataedit = reactive({
    id : null,
    nom_mpikatroka :"", 
    id_fivondronana :null, 
    id_categorie :null
})

const getData = async () => {
    try {
        const response = await axios.get(`${api}/mpikatroka`);
        data.value = response.data;
        
    } catch (error) {
        error.value = "Failed to load data";
        console.log(error);
    }
}

const getFivondronana = async () => {
    try {
        const response = await axios.get(`${api}/fivondronana`);
        fivondronana.value = response.data;
    } catch (error) {
        error.value = "Failed to load data";
        console.log(error);
    }
}

const getCategorie = async () => {
    try {
        const response = await axios.get(`${api}/categories`);
        categories.value = response.data;
    } catch (error) {
        error.value = "Failed to load data";
        console.log(error);
    }
}

const InsertMpikatroka = () => {
    try {
        const response = axios.post(`${api}/mpikatroka/create`, {
            nom_mpikatroka : datainput.nom_mpikatroka,
            id_fivondronana : datainput.id_fivondronana,
            id_categorie : datainput.id_categorie
        });
        getData();
        message.value = "Insertion effectué avec succès !"
    } catch (error) {
        console.log(error);
    }
}

const UpdateFivondronana = () => {
    try {
        const response = axios.put(`${api}/fivondronana/update/${dataedit.id}`, {
            nom : dataedit.nom,
            filoha : dataedit.filoha,
            id_faritra: dataedit.id_faritra
        });

        getData();

        message.value = "Modification effectué avec succès !"
    } catch (error) {
        console.log(error);
    }
}

const Delete = async (id) => {
    if(confirm('Etes-vous sûr de vouloir suppimer cette donnée ?')){
        try {
            axios.delete(`${api}/fivondronana/delete/${id}`);
            getData();
            alert("Succès !!");
        } catch (error) {
            console.log(error);
        }
    }
}

const OpenEditForm = (item) => {
    dataedit.id = item.id;
    dataedit.nom = item.nom;
    dataedit.filoha = item.filoha;
    dataedit.id_faritra = item.faritra_id;
}

onMounted(() => {
    getFivondronana();
    getData();
    getCategorie();
})

</script>
<template>
    <div class="p-4 w-full">
        <div>
            <div class="py-2 bg-white px-4 flex justify-between items-center">
                <ul class="flex text-sm text-gray-800 space-x-2">
                    <li><a href="">Tableau de bord</a></li>
                    <li>></li>
                    <li><a href="">mpikatroka</a></li>
                    <li>></li>
                    <li><a href="">listes</a></li>
                </ul>
                <div class="flex items-center space-x-2">
                    <label for="">Année :</label>
                    <input v-model="annee" type="year" class="px-3 py-1 border border-gray-300 rounded-md">
                </div>
                <div>
                    <button @click="modalajout = !modalajout" class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-md">Hampiditra</button>
                </div>
            </div>
        </div>
        <div>
            {{ data }}
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
                            Fivondrona
                        </td>
                        <td>
                            Andraikitra
                        </td>
                        <td>
                            Cotisations {{ annee }}
                        </td>
                        <td>
                            Action
                        </td>
                    </tr>
                    <tbody>
                        <tr v-for="(mpikatroka, key) in data">
                            <td class="py-2">{{ key + 1}}</td>
                            <td>{{ mpikatroka.nom_mpikatroka}}</td>
                            <td>{{ mpikatroka.nom_categorie }}</td>
                            <td>{{ mpikatroka.nom }}</td>
                            <td>
                                <span class="px-2 py-1 text-xs bg-green-100 rounded-md text-green-800">
                                    Payé
                                </span>
                            </td>
                           
                            <td class="flex space-x-3 items-center py-2">
                                <button @click="Delete(mpikatroka.id)" class="px-3 py-1 rounded-md hover:bg-red-500 bg-red-600 text-white text-sm">Supprimer</button>
                                <button @click="OpenEditForm(mpikatroka); modaledit = !modaledit" class="px-3 py-1 rounded-md hover:bg-blue-500 bg-blue-600 text-white text-sm">Modifier</button>
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
                   <p class="font-semibold text-2xl text-center">Ajout mpikatroka</p>
                   <button @click="modalajout = !modalajout; message ='';">Fermer</button>
                </div>
                <div class="mt-10">
                    {{ datainput }}
                    <div v-if="message" class="py-2 text-center bg-green-100 text-green-900">
                        {{ message }}
                    </div>
                    <form @submit.prevent="InsertMpikatroka" class="space-y-2">
                        <div class="flex flex-col">
                            <label for="">Anarana</label>
                            <input v-model="datainput.nom_mpikatroka" class="px-2 h-12 border border-gray-400 rounded-md" type="text" placeholder="Anarana">
                        </div>

                        <div class="flex flex-col">
                            <label for="">Fivondronana</label>
                            <select class="px-2 h-12 border border-gray-400 rounded-md" v-model="datainput.id_fivondronana">
                                <option class="" v-for="f in fivondronana" :value="f.id">{{ f.nom }}</option>
                            </select>
                        </div>

                        <div class="flex flex-col">
                            <label for="">Andraikitra</label>
                            <select class="px-2 h-12 border border-gray-400 rounded-md" v-model="datainput.id_categorie ">
                                <option v-for="cat in categories" :value="cat.id_categorie ">{{ cat.nom_categorie }}</option>
                            </select>
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
                   <p class="font-semibold text-2xl text-center">Modification Fivondronana</p>
                   <button @click="modaledit = !modaledit; message = ''">Fermer</button>
                </div>
                <div class="mt-10">
            
                    <div v-if="message" class="py-2 text-center bg-green-100 text-green-900">
                        {{ message }}
                    </div>
                    <form @submit.prevent="UpdateFivondronana" class="space-y-2">
                        <div class="flex flex-col">
                            <label for="">Fivondronana</label>
                            <input v-model="dataedit.nom" class="px-2 h-12 border border-gray-400 rounded-md" type="text" placeholder="Fivondronana">
                        </div>
                        <div class="flex flex-col">
                            <label for="">Faritra</label>
                            <select v-model="dataedit.id_faritra" class="px-2 h-12 border border-gray-400 rounded-md" >
                                <option :selected="dataedit.id_faritra == d.id" v-for="d in faritra" :value="d.id" :key="d.id">{{ d.nom_faritra }}</option>
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