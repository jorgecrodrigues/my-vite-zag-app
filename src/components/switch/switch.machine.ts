import { createMachine, MachineSchema } from "@zag-js/core";
import { Service } from "@zag-js/core";
import { NormalizeProps } from "@zag-js/types";

export const machine: MachineSchema = createMachine({
  // initial state
  initialState() {
    return "inactive";
  },
  // the finite states ...
  states: {
    active: {
      on: {
        CLICK: {
          // go to inactive
          target: "inactive",
        },
      },
    },
    inactive: {
      on: {
        CLICK: {
          // go to active
          target: "active",
        },
      },
    },
  },
});

export function connect(service: Service<any>, normalize: NormalizeProps<any>) {
  const active = service.state.matches("active");

  return {
    active,
    getButtonProps(): React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
      return normalize.element({
        type: "button",
        role: "button",
        "aria-label": `Toggle ${active ? "off" : "on"}`,
        className: `button ${active ? "button-active" : "button-inactive"}`,
        style: {
          padding: 10,
          backgroundColor: active ? "green" : "red",
          cursor: "pointer",
        },
        onClick(event) {
          if (event.defaultPrevented) return;
          service.send({ type: "CLICK" });
        },
      });
    },
  };
}
