import { ModRegistrar } from "cs2/modding";
import { MousePositionPanel } from "mods/mouse-position-panel";
import { CS2VanillaUIResolver } from "mods/CS2VanillaUIResolver";

const register: ModRegistrar = (moduleRegistry) => {

    CS2VanillaUIResolver.setRegistry(moduleRegistry);

    moduleRegistry.append('Game', MousePositionPanel);  
}

export default register;