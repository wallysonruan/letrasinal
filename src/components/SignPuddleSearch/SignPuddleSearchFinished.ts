function dispatchSignPuddleSearchFinishedEvent(event: Event, data: Object) {
  const e_signPuddleSearchFinished = new CustomEvent(
    "sign-puddle-search-finished",
    {
      detail: data,
      bubbles: true,
    },
  );

  event.target?.dispatchEvent(e_signPuddleSearchFinished);
}

export default dispatchSignPuddleSearchFinishedEvent;
