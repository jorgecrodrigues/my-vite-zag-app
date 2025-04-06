import { Service, Machine } from "@zag-js/core";
import { useMachine, normalizeProps } from "@zag-js/react";
import { machine, connect } from "./switch.machine";

export default function Switch() {
  const service: Service<any> = useMachine(machine as Machine<any>);
  const api = connect(service, normalizeProps);
  return (
    <button {...api.getButtonProps()}>
      State: {api.active ? "ON" : "OFF"}
    </button>
  );
}
