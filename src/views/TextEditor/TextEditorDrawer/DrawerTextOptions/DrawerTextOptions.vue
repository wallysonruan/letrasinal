<script setup lang="ts">
import pageStore from "@/stores/PageStore";
</script>
<template>
  <div>
    <h2 class="drawer-text-title">Configurações do Texto</h2>
    <v-card variant="flat">
      <v-card-text> Orientação do Texto </v-card-text>
      <v-card-actions>
        <v-btn @click="pageStore().setWritingMode('vertical')">
          Vertical
        </v-btn>
        <v-btn @click="pageStore().setWritingMode('horizontal')">
          Horizontal</v-btn
        >
      </v-card-actions>
    </v-card>
    <!--  -->
    <section class="conf">
      <div class="conf-title">
        <label for="show-columns">Mostrar 3 Colunas</label>
        <div class="conf-description">
          <p>Registram o parâmetro de localização espacial.</p>
        </div>
      </div>
      <div class="conf-action">
        <v-switch
          @update:model-value="pageStore().toggleColumns"
          hide-details
          id="show-columns"
        />
      </div>
    </section>
    <!--  -->
    <section class="conf">
      <div class="conf-title">
        <label for="show-breakflows">Mostrar Quebra de Fluxo</label>
        <div class="conf-description">
          <p>Inicia um novo bloco de texto na linha ou coluna seguinte.</p>
        </div>
      </div>
      <div class="conf-action">
        <v-switch
          @update:model-value="pageStore().toggleBreakflow"
          hide-details
          id="show-breakflows"
        />
      </div>
    </section>
    <!--  -->
    <section class="conf">
      <div class="conf-title">
        <label for="show-spaces">Mostrar Espaços</label>
      </div>
      <div class="conf-action">
        <v-switch
          @update:model-value="pageStore().toggleSpaces"
          hide-details
          id="show-spaces"
        />
      </div>
    </section>
  </div>
</template>
<style scoped lang="scss">
.drawer-text-title {
  font-size: 1rem;
}

section {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 1rem;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .conf-description {
    font-size: 0.7rem;
  }
  .conf-action {
    .v-input__control {
      justify-content: center;
    }
  }
}
</style>
