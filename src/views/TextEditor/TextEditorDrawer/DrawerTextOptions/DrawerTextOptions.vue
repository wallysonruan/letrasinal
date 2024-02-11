<script setup lang="ts">
import pageStore from "@/stores/PageStore";
import { computed, ref } from "vue";

const activateColumn = computed(() => pageStore().shouldActivateColumns());
const localactivateColumns = ref<boolean>(activateColumn.value);
function toggleColumnBorderVisibility(event: Event) {
  const target = event.target as HTMLInputElement;
  const targetId = target.id as "left" | "middle" | "right";
  pageStore().toggleColumnsVisibility(targetId, target.checked);
}

function toggleAllColumnsVisibility(event: Event) {
  const target = event.target as HTMLInputElement;
  pageStore().toggleAllColumnsVisibility(target.checked);
}

const rightColumnBorder = computed(() => {
  return pageStore().getColumnsVisibility("right");
});

const middleColumnBorder = computed(() => {
  return pageStore().getColumnsVisibility("middle");
});

const leftColumnBorder = computed(() => {
  return pageStore().getColumnsVisibility("left");
});

const allColumnsBorder = computed(() => {
  return pageStore().getColumnsVisibility("all");
});
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
    <div>
      <p>Colunas</p>
      <p><small>Registram o parâmetro de localização espacial.</small></p>
      <div class="activate-columns">
        <div>
          <label for="show-columns" class="activate-columns-title"
            >Ativar Colunas</label
          >
        </div>
        <div>
          <v-switch
            v-model="localactivateColumns"
            @update:model-value="pageStore().toggleColumns"
            hide-details
            id="show-columns"
          />
        </div>
      </div>
      <div>
        <p>Mostrar Colunas</p>
        <ul class="show-columns">
          <li>
            <label for="all">Todas</label>
            <input
              type="checkbox"
              id="all"
              :checked="allColumnsBorder"
              @change="toggleAllColumnsVisibility"
            />
          </li>
          <li>
            <label for="left">Esquerda</label>
            <input
              type="checkbox"
              id="left"
              :checked="leftColumnBorder"
              @change="toggleColumnBorderVisibility"
            />
          </li>
          <!--  -->
          <li>
            <label for="middle">Centro</label>
            <input
              type="checkbox"
              id="middle"
              :checked="middleColumnBorder"
              @change="toggleColumnBorderVisibility"
            />
          </li>
          <!--  -->
          <li>
            <label for="right">Direita</label>
            <input
              type="checkbox"
              id="right"
              :checked="rightColumnBorder"
              @change="toggleColumnBorderVisibility"
            />
          </li>
          <!--  -->
        </ul>
      </div>
    </div>
    <section class="conf"></section>
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

.activate-columns {
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 1rem;
  align-items: center;
}
</style>
