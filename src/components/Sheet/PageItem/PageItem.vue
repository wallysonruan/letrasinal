<script setup lang="ts">
import pageStore, {
  type SignDetails,
  type SignPunctuationDetails,
} from "../../../stores/PageStore";
import SignComponent from "../../common/SignComponent/SignComponent.vue";
import SignPunctuation from "../../common/SignPunctuation/SignPunctuation.vue";
import PunctuationComponent from "../../common/PunctuationComponent/PunctuationComponent.vue";
import BreakflowComponent from "@/components/common/BreakflowComponent/BreakflowComponent.vue";
import CaretComponent from "@/components/common/CaretComponent/CaretComponent.vue";
import NumberComponent from "@/components/common/NumberComponent/NumberComponent.vue";
import { computed } from "vue";
import { watch } from "vue";
import { ref } from "vue";
import type { PageItem } from "@/utils/types";
import { info, isType, parse } from "@sutton-signwriting/core/fsw";

type PageItemProps = {
  pageId: number;
  item: PageItem;
};
const props = defineProps<PageItemProps>();

const writingMode = computed(() => {
  return pageStore().getWritingConfiguration(props.pageId).writingMode;
});

const reRenderingNecessary = computed(() => {
  const pageText = pageStore().getPageText(props.pageId);
  const item = pageText?.find((item) => item.id === props.item.id);
  const details = item?.details as SignDetails | SignPunctuationDetails;

  if (details === undefined) {
    return;
  }

  return details.style?.fontSize;
});

const key = ref<number>(0); // This is a hack to force re-rendering of the component

watch(reRenderingNecessary, () => {
  if (reRenderingNecessary.value !== undefined) {
    key.value++;
  }
});

const marginToCentralizeAccordingWithHeadPosition = computed(() => {
  const columnWidth = 150;
  const fswInfo = parse.sign(props.item.details.fsw);
  const hasHead = fswInfo.spatials?.find((spatial) =>
    isType(spatial.symbol, "head"),
  );

  if (hasHead === undefined) {
    return undefined;
  }

  const smallestSpatial = fswInfo.spatials?.reduce((smallest, spatial) =>
    spatial.coord[0] < smallest.coord[0] ? spatial : smallest,
  );

  const smallestIsHead = isType(smallestSpatial!.symbol, "head");

  if (!smallestIsHead) {
    return 0;
  }

  return columnWidth / 2 - 9.5;
});
</script>
<template>
  <div
    class="PageItem"
    :id="props.item.id"
    :writing-mode="writingMode"
    :style="{
      'margin-left': marginToCentralizeAccordingWithHeadPosition + 'px',
    }"
  >
    <SignComponent
      v-if="props.item.type === 'sign'"
      :sign="props.item.details"
      :key="`${key}-sign`"
    />
    <!---->
    <SignPunctuation
      v-else-if="props.item.type === 'signPunctuation'"
      :sign="props.item.details"
      :page-id="props.pageId"
      :key="`${key}-signpunctuation`"
    />
    <!---->
    <PunctuationComponent
      v-else-if="props.item.type === 'punctuation'"
      :type="props.item.details"
      :page-id="props.pageId"
    />
    <!---->
    <BreakflowComponent
      v-else-if="props.item.type === 'breakflow'"
      :id="props.item.id"
      :page-id="props.pageId"
    />
    <!---->
    <CaretComponent
      v-else-if="props.item.type === 'caret'"
      :page-id="props.pageId"
    />
    <!--  -->
    <NumberComponent
      v-else-if="props.item.type === 'number'"
      :number="props.item.details"
      :page-id="props.pageId"
    />
  </div>
</template>
