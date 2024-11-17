<script setup>
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
</script>
<template>
    <div style="background-color:#efefef;">
        <div>
            <Navbar/>
        </div>
        <div class="w-full flex">
            <div>
                <Sidebar/>
            </div>
            <div class="p-5 w-full">
                <slot></slot>
            </div>
        </div>
    </div>
</template>