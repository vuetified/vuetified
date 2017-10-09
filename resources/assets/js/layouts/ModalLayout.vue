<template>
  <v-app standalone v-cloak>
    <main>
       <v-container transition="slide-x-transition" fluid class="pa-0 ma-0 white">

        <v-card :flat="true">
            <slot name="toolbar"></slot>

            <slot></slot>

            <slot name="footer"></slot>
        </v-card>

        </v-container>
    </main>
</v-app>
</template>
