import { HUDContent } from "../../components/HUD/HUD";
import { Action } from "../../SharedTypes";
import ArrowClockwise from "@fluentui/svg-icons/icons/arrow_clockwise_20_regular.svg";
import Code from "@fluentui/svg-icons/icons/code_20_filled.svg";
import { assertUnreachable } from "../../utils/assertUnreachable";

type ActionKey = keyof Action;

export function getActionCode(action: Action): ActionKey | null {
  const key = Object.entries(action).flatMap(([key, value]) =>
    value ? key : []
  )[0] as ActionKey;
  return key ?? null;
}

export function getActionHUDContent(action: Action): HUDContent {
  const key = getActionCode(action);
  switch (key) {
    case "tabClose":
      return { title: "Close Tab" };
    case "tabCloseAll":
      return { title: "Close All Tabs" };
    case "tabOpen":
      return { title: "Open New Tab" };
    case "tabDuplicate":
      return { title: "Duplicate Tab" };
    case "tabNext":
      return { title: "Next Tab" };
    case "tabPrevious":
      return { title: "Previous Tab" };
    case "reload":
      return { title: "Reload", icon: ArrowClockwise };
    case "javascriptRun": {
      const c: HUDContent = { title: "Run JavaScript", icon: Code };
      if (action?.javascriptRun?.description) {
        c.message = action.javascriptRun.description;
      }
      return c;
    }
    case "urlCopy":
      return { title: "Copy URL" };
    case "share":
      return { title: "Share" };
    case "scrollTop":
      return { title: "Scroll to Top" };
    case "scrollBottom":
      return { title: "Scroll to Bottom" };
    case null:
      break;
    default:
      assertUnreachable(key);
  }
  return { title: "Unknown Action" };
}
