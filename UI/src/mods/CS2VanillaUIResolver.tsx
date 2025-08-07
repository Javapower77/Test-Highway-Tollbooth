import { BalloonAlignment, BalloonDirection, Color, FocusKey, Theme, UniqueFocusKey } from "cs2/bindings";
import { InputAction } from "cs2/input";
import { ModuleRegistry } from "cs2/modding";
import { HTMLAttributes, ReactNode, RefObject } from "react";

// This is an auto-generated file based on analysis of Cities: Skylines II vanilla UI modules
// Last updated: 2025-07-29

// COMPREHENSIVE PROPS INTERFACES
type PropsToolButton = {
    focusKey?: UniqueFocusKey | null;
    src?: string;
    selected?: boolean;
    multiSelect?: boolean;
    disabled?: boolean;
    tooltip?: ReactNode | null;
    selectSound?: any;
    uiTag?: string;
    className?: string;
    children?: ReactNode;
    onSelect?: (x: any) => any;
} & HTMLAttributes<any>;

type PropsSection = {
    title?: string | null;
    uiTag?: string;
    children: ReactNode;
};

type PropsInfoSection = {
    title?: string;
    children: ReactNode;
    className?: string;
};

type PropsDescriptionTooltip = {
    title: string | null;
    description: string | null;
    content?: JSX.Element | null;
    shortcut?: ReactNode | null;
    children?: ReactNode;
};

type PropsTooltip = {
    tooltip: ReactNode;
    disabled?: boolean;
    forceVisible?: boolean;
    direction?: BalloonDirection;
    alignment?: BalloonAlignment;
    className?: string;
    children: React.ReactElement & { ref?: React.Ref<HTMLElement> };
    anchorElRef?: RefObject<HTMLElement>;
};

type PropsTooltipRenderer = {
    title: string;
    description?: string;
    icon?: string;
    shortcut?: ReactNode;
    children?: ReactNode;
    theme?: any;
};

type PropsBoundTooltipGroup = {
    children: ReactNode;
};

type PropsSelectedInfoPanel = {
    children: ReactNode;
    title?: string;
    onClose?: () => void;
};

type PropsColorField = {
    focusKey?: FocusKey;
    disabled?: boolean;
    value?: Color;
    className?: string;
    selectAction?: InputAction;
    alpha?: any;
    popupDirection?: BalloonDirection;
    onChange?: (e: Color) => void;
    onClick?: (e: any) => void;
    onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void;
};

type PropsLayout = {
    style?: React.CSSProperties;
    className?: string;
    children: ReactNode;
};

type PropsButton = {
    variant?: "flat" | "primary" | "round" | "menu" | "default" | "icon" | "floating";
    src?: string;
    tinted?: boolean;
    children?: ReactNode;
} & HTMLAttributes<any>;

type PropsIcon = {
    tinted?: boolean;
    className?: string;
    src?: string;
    children?: ReactNode;
};

type PropsPanel = {
    draggable?: boolean;
    header?: ReactNode | null;
    theme?: any;
    children: ReactNode;
} & HTMLAttributes<any>;

type PropsGamePanelRenderer = {
    children: ReactNode;
    __Type: "InfoPanel";
};

type PropsSlider = {
    focusKey?: FocusKey;
    disabled?: boolean;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    className?: string;
    onChange?: (value: number) => void;
};

type PropsTextField = {
    focusKey?: FocusKey;
    disabled?: boolean;
    value?: string;
    placeholder?: string;
    className?: string;
    onChange?: (value: string) => void;
};

type PropsCheckbox = {
    focusKey?: FocusKey;
    disabled?: boolean;
    checked?: boolean;
    className?: string;
    children?: ReactNode;
    onChange?: (checked: boolean) => void;
};


type PropsProgressBar = {
    value?: number;
    max?: number;
    className?: string;
    theme?: any;
};

type PropsScrollable = {
    className?: string;
    children: ReactNode;
    direction?: "vertical" | "horizontal" | "both";
};

type PropsModal = {
    visible?: boolean;
    title?: string;
    onClose?: () => void;
    children: ReactNode;
    className?: string;
};

type PropsTabContainer = {
    selectedIndex?: number;
    onTabSelect?: (index: number) => void;
    children: ReactNode;
    className?: string;
};

type PropsTab = {
    label?: string;
    disabled?: boolean;
    children: ReactNode;
};

type PropsFormGroup = {
    label?: string;
    children: ReactNode;
    className?: string;
};

type PropsToggle = {
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
};

// worked great after de-obfuscation
type CapacityBarProps = {
    progress: number;
    max: number;
    plain?: boolean;
    invertColorCodes?: boolean;
    children?: React.ReactNode;
    className?: string;
};

type DropdownProps = {
    children: ReactNode;
    className?: string;
    defaultOpen?: boolean;
    selectedValue?: any;
    onSelectionChange?: (value: any) => void;
    focusKey?: string;
};

type DropdownToggleProps = {
    theme?: any;
    openIconComponent?: ReactNode;
    closeIconComponent?: ReactNode;
    buttonTheme?: any;
    sounds?: any;
    showHint?: boolean;
    selectSound?: string;
    tooltipLabel?: string;
    className?: string;
    children: ReactNode;
    [key: string]: any;
};

type DropdownItemProps<T = any> = {
    children: ReactNode;
    className?: string;
    value?: T;
    selected?: boolean;
    onClick?: (value: T) => void;
    focusKey?: string;
};

// COMPREHENSIVE REGISTRY INDEX
const registryIndex = {
    // Layout Components
    Row: ["game-ui/ui/layout.tsx", "Row"],
    Col: ["game-ui/ui/layout.tsx", "Col"],
    layoutTheme: ["game-ui/ui/layout.module.scss", "classes"],
    
    // Button Components
    Button: ["game-ui/ui/button.tsx", "Button"],
    MenuButton: ["game-ui/ui/button.tsx", "MenuButton"],
    FloatingButton: ["game-ui/ui/button.tsx", "FloatingButton"],
    ToolButton: ["game-ui/game/components/tool-options/tool-button/tool-button.tsx", "ToolButton"],
    toolButtonTheme: ["game-ui/game/components/tool-options/tool-button/tool-button.module.scss", "classes"],
    
    // Icon Components
    Icon: ["game-ui/ui/icon.tsx", "Icon"],
    iconTheme: ["game-ui/ui/icon.module.scss", "classes"],
    
    // Panel Components
    Panel: ["game-ui/ui/panel.tsx", "Panel"],
    panelTheme: ["game-ui/ui/panel.module.scss", "classes"],
    Section: ["game-ui/game/components/tool-options/mouse-tool-options/mouse-tool-options.tsx", "Section"],
    mouseToolOptionsTheme: ["game-ui/game/components/tool-options/mouse-tool-options/mouse-tool-options.module.scss", "classes"],
    
    // Tooltip Components
    Tooltip: ["game-ui/common/tooltip/tooltip.tsx", "Tooltip"],
    DescriptionTooltip: ["game-ui/common/tooltip/description-tooltip/description-tooltip.tsx", 'DescriptionTooltip'],
    descriptionTooltipTheme: ["game-ui/common/tooltip/description-tooltip/description-tooltip.module.scss", "classes"],
    TooltipRenderer: ["game-ui/common/tooltip/tooltip-renderer/tooltip-renderer.tsx", "TooltipRenderer"],
    tooltipRendererTheme: ["game-ui/common/tooltip/tooltip-renderer/tooltip-renderer.module.scss", "classes"],
    BoundTooltipGroup: ["game-ui/common/tooltip/tooltip-renderer/tooltip-renderer.tsx", "BoundTooltipGroup"],
    
    // Input Components
    ColorField: ["game-ui/common/input/color-picker/color-field/color-field.tsx", 'ColorField'],
    Slider: ["game-ui/common/input/slider/slider.tsx", "Slider"],
    TextField: ["game-ui/common/input/text-field/text-field.tsx", "TextField"],
    Checkbox: ["game-ui/common/input/toggle/checkbox.tsx", "Checkbox"],
    Toggle: ["game-ui/common/input/toggle/toggle.tsx", "Toggle"],
    
    //de-ofuscated 
    CapacityBar: ["game-ui/game/components/selected-info-panel/shared-components/capacity-bar/capacity-bar.tsx", "CapacityBar"],
    CapacityBarTheme: ["game-ui/game/components/selected-info-panel/shared-components/capacity-bar/capacity-bar.module.scss", "classes"],
    //de-ofuscated
    Dropdown: ["game-ui/common/input/dropdown/dropdown.tsx", "Dropdown"],
    DropdownToggle: ["game-ui/common/input/dropdown/dropdown-toggle.tsx", "DropdownToggle"],
    DropdownItem: ["game-ui/common/input/dropdown/items/dropdown-item.tsx", "DropdownItem"],
    DropdownTheme: ["game-ui/common/input/dropdown/themes/default.module.scss", "classes"],

    // Navigation Components
    TabContainer: ["game-ui/common/navigation/tab-container/tab-container.tsx", "TabContainer"],
    Tab: ["game-ui/common/navigation/tab/tab.tsx", "Tab"],
    
    // Feedback Components
    ProgressBar: ["game-ui/common/feedback/progress-bar/progress-bar.tsx", "ProgressBar"],
    
    // Display Components
    Modal: ["game-ui/common/overlay/modal/modal.tsx", "Modal"],
    Scrollable: ["game-ui/common/scrollable/scrollable.tsx", "Scrollable"],
    
    // Form Components
    FormGroup: ["game-ui/common/form/form-group/form-group.tsx", "FormGroup"],
    
    // Asset Menu Components
    AssetGrid: ["game-ui/game/components/asset-menu/asset-grid/asset-grid.tsx", "AssetGrid"],
    assetGridTheme: ["game-ui/game/components/asset-menu/asset-grid/asset-grid.module.scss", "classes"],
    AssetItem: ["game-ui/game/components/asset-menu/asset-item/asset-item.tsx", "AssetItem"],
    
    // InfoView Components
    InfoPanel: ["game-ui/game/components/info-panel/info-panel.tsx", "InfoPanel"],
    InfoSection: ["game-ui/game/components/selected-info-panel/shared-components/info-section/info-section.tsx", "InfoSection"],
    infoSectionTheme: ["game-ui/game/components/selected-info-panel/shared-components/info-section/info-section.module.scss", "classes"],
    SelectedInfoPanel: ["game-ui/game/components/selected-info-panel/selected-info-panel.tsx", "SelectedInfoPanel"],
    selectedInfoPanelTheme: ["game-ui/game/components/selected-info-panel/selected-info-panel.module.scss", "classes"],
    
    // Game UI Specific Components
    GameButton: ["game-ui/game/components/game-button/game-button.tsx", "GameButton"],
    GamePanel: ["game-ui/game/components/game-panel/game-panel.tsx", "GamePanel"],
    GamePanelRenderer: ["game-ui/game/components/game-panel-renderer.tsx", "GamePanelRenderer"],
    ToolPanel: ["game-ui/game/components/tool-panel/tool-panel.tsx", "ToolPanel"],
    
    // Chart Components
    Chart: ["game-ui/common/chart/chart.tsx", "Chart"],
    LineChart: ["game-ui/common/chart/line-chart/line-chart.tsx", "LineChart"],
    BarChart: ["game-ui/common/chart/bar-chart/bar-chart.tsx", "BarChart"],
    
    // Menu Components
    ContextMenu: ["game-ui/common/menu/context-menu/context-menu.tsx", "ContextMenu"],
    MenuItem: ["game-ui/common/menu/menu-item/menu-item.tsx", "MenuItem"],
    
    // Focus Management
    FOCUS_DISABLED: ["game-ui/common/focus/focus-key.ts", "FOCUS_DISABLED"],
    FOCUS_AUTO: ["game-ui/common/focus/focus-key.ts", "FOCUS_AUTO"],
    useUniqueFocusKey: ["game-ui/common/focus/focus-key.ts", "useUniqueFocusKey"],
    
    // Utility Hooks
    useLocalization: ["game-ui/common/localization/localization-hooks.ts", "useLocalization"],
    useValue: ["cs2/api", "useValue"],
    bindValue: ["cs2/api", "bindValue"],
    
    // Theme Variables
    themeVariables: ["game-ui/ui/theme.module.scss", "classes"],
    colorPalette: ["game-ui/ui/colors.module.scss", "classes"],
    gameMainScreenTheme: ["game-ui/game/components/game-main-screen.module.scss", "classes"],
    
    // Animation Components
    Transition: ["game-ui/common/animation/transition.tsx", "Transition"],
    FadeIn: ["game-ui/common/animation/fade-in.tsx", "FadeIn"],
    
    // Layout Utilities
    Flex: ["game-ui/ui/flex.tsx", "Flex"],
    Grid: ["game-ui/ui/grid.tsx", "Grid"],
    Stack: ["game-ui/ui/stack.tsx", "Stack"],
};

export class CS2VanillaUIResolver {
    public static get instance(): CS2VanillaUIResolver { return this._instance!!; }
    private static _instance?: CS2VanillaUIResolver;

    public static setRegistry(in_registry: ModuleRegistry) { this._instance = new CS2VanillaUIResolver(in_registry); }
    private registryData: ModuleRegistry;

    constructor(in_registry: ModuleRegistry) {
        this.registryData = in_registry;
    }

    private cachedData: Partial<Record<keyof typeof registryIndex, any>> = {};
    private updateCache(entry: keyof typeof registryIndex) {
        const entryData = registryIndex[entry];
        return this.cachedData[entry] = this.registryData.registry.get(entryData[0])!![entryData[1]];
    }

    // LAYOUT COMPONENTS
    public get Row(): (props: PropsLayout) => JSX.Element { return this.cachedData["Row"] ?? this.updateCache("Row"); }
    public get Col(): (props: PropsLayout) => JSX.Element { return this.cachedData["Col"] ?? this.updateCache("Col"); }
    public get Flex(): (props: PropsLayout) => JSX.Element { return this.cachedData["Flex"] ?? this.updateCache("Flex"); }
    public get Grid(): (props: PropsLayout) => JSX.Element { return this.cachedData["Grid"] ?? this.updateCache("Grid"); }
    public get Stack(): (props: PropsLayout) => JSX.Element { return this.cachedData["Stack"] ?? this.updateCache("Stack"); }
    public get layoutTheme(): Theme | any { return this.cachedData["layoutTheme"] ?? this.updateCache("layoutTheme"); }

    // BUTTON COMPONENTS
    public get Button(): (props: PropsButton) => JSX.Element { return this.cachedData["Button"] ?? this.updateCache("Button"); }
    public get MenuButton(): (props: PropsButton) => JSX.Element { return this.cachedData["MenuButton"] ?? this.updateCache("MenuButton"); }
    public get FloatingButton(): (props: PropsButton) => JSX.Element { return this.cachedData["FloatingButton"] ?? this.updateCache("FloatingButton"); }
    public get GameButton(): (props: PropsButton) => JSX.Element { return this.cachedData["GameButton"] ?? this.updateCache("GameButton"); }
    public get ToolButton(): (props: PropsToolButton) => JSX.Element { return this.cachedData["ToolButton"] ?? this.updateCache("ToolButton"); }
    public get toolButtonTheme(): Theme | any { return this.cachedData["toolButtonTheme"] ?? this.updateCache("toolButtonTheme"); }

    // ICON COMPONENTS
    public get Icon(): (props: PropsIcon) => JSX.Element { return this.cachedData["Icon"] ?? this.updateCache("Icon"); }
    public get iconTheme(): Theme | any { return this.cachedData["iconTheme"] ?? this.updateCache("iconTheme"); }

    // PANEL COMPONENTS
    public get Panel(): (props: PropsPanel) => JSX.Element { return this.cachedData["Panel"] ?? this.updateCache("Panel"); }
    public get GamePanel(): (props: PropsPanel) => JSX.Element { return this.cachedData["GamePanel"] ?? this.updateCache("GamePanel"); }
    public get GamePanelRenderer(): (props: PropsGamePanelRenderer) => JSX.Element {
        if (this.cachedData["GamePanelRenderer"]) {
            return this.cachedData["GamePanelRenderer"];
        }
        const PanelComponent = this.registryData.registry.get("game-ui/game/components/game-panel-renderer.tsx")!!.GamePanelRenderer;
        if (typeof PanelComponent.render === 'function') {
            return this.cachedData["GamePanelRenderer"] = PanelComponent.render;
        }
        return this.cachedData["GamePanelRenderer"] = PanelComponent;
    }
    public get ToolPanel(): (props: PropsPanel) => JSX.Element { return this.cachedData["ToolPanel"] ?? this.updateCache("ToolPanel"); }
    public get InfoPanel(): (props: PropsPanel) => JSX.Element { return this.cachedData["InfoPanel"] ?? this.updateCache("InfoPanel"); }
    public get panelTheme(): Theme | any { return this.cachedData["panelTheme"] ?? this.updateCache("panelTheme"); }
    public get Section(): (props: PropsSection) => JSX.Element { return this.cachedData["Section"] ?? this.updateCache("Section"); }
    public get InfoSection(): (props: PropsInfoSection) => JSX.Element { return this.cachedData["InfoSection"] ?? this.updateCache("InfoSection"); }
    public get infoSectionTheme(): Theme | any { return this.cachedData["infoSectionTheme"] ?? this.updateCache("infoSectionTheme"); }
    public get mouseToolOptionsTheme(): Theme | any { return this.cachedData["mouseToolOptionsTheme"] ?? this.updateCache("mouseToolOptionsTheme"); }
    public get SelectedInfoPanel(): (props: PropsSelectedInfoPanel) => JSX.Element { return this.cachedData["SelectedInfoPanel"] ?? this.updateCache("SelectedInfoPanel"); }
    public get selectedInfoPanelTheme(): Theme | any { return this.cachedData["selectedInfoPanelTheme"] ?? this.updateCache("selectedInfoPanelTheme"); }

    // TOOLTIP COMPONENTS
    public get Tooltip(): (props: PropsTooltip) => JSX.Element { return this.cachedData["Tooltip"] ?? this.updateCache("Tooltip"); }
    public get DescriptionTooltip(): (props: PropsDescriptionTooltip) => JSX.Element { return this.cachedData["DescriptionTooltip"] ?? this.updateCache("DescriptionTooltip"); }
    public get TooltipRenderer(): (props: PropsTooltipRenderer) => JSX.Element { return this.cachedData["TooltipRenderer"] ?? this.updateCache("TooltipRenderer"); }
    public get descriptionTooltipTheme(): Theme | any { return this.cachedData["descriptionTooltipTheme"] ?? this.updateCache("descriptionTooltipTheme"); }
    public get tooltipRendererTheme(): Theme | any { return this.cachedData["tooltipRendererTheme"] ?? this.updateCache("tooltipRendererTheme"); }
    public get BoundTooltipGroup(): (props: PropsBoundTooltipGroup) => JSX.Element { return this.cachedData["BoundTooltipGroup"] ?? this.updateCache("BoundTooltipGroup"); }

    // INPUT COMPONENTS
    public get ColorField(): (props: PropsColorField) => JSX.Element { return this.cachedData["ColorField"] ?? this.updateCache("ColorField"); }
    public get Slider(): (props: PropsSlider) => JSX.Element { return this.cachedData["Slider"] ?? this.updateCache("Slider"); }
    public get TextField(): (props: PropsTextField) => JSX.Element { return this.cachedData["TextField"] ?? this.updateCache("TextField"); }
    public get Checkbox(): (props: PropsCheckbox) => JSX.Element { return this.cachedData["Checkbox"] ?? this.updateCache("Checkbox"); }
    public get Toggle(): (props: PropsToggle) => JSX.Element { return this.cachedData["Toggle"] ?? this.updateCache("Toggle"); }

    
    public get CapacityBar(): (props: CapacityBarProps) => JSX.Element { return this.cachedData["CapacityBar"] ?? this.updateCache("CapacityBar"); }
    public get CapacityBarTheme(): Theme | any { return this.cachedData["CapacityBarTheme"] ?? this.updateCache("CapacityBarTheme"); }
    public get Dropdown(): (props: DropdownProps) => JSX.Element { return this.cachedData["Dropdown"] ?? this.updateCache("Dropdown"); }
    public get DropdownToggle(): (props: DropdownToggleProps) => JSX.Element { return this.cachedData["DropdownToggle"] ?? this.updateCache("DropdownToggle"); }
    public get DropdownItem(): <T = any>(props: DropdownItemProps<T>) => JSX.Element { return this.cachedData["DropdownItem"] ?? this.updateCache("DropdownItem"); }    
    public get DropdownTheme(): Theme | any { return this.cachedData["DropdownTheme"] ?? this.updateCache("DropdownTheme"); }   

    // NAVIGATION COMPONENTS
    public get TabContainer(): (props: PropsTabContainer) => JSX.Element { return this.cachedData["TabContainer"] ?? this.updateCache("TabContainer"); }
    public get Tab(): (props: PropsTab) => JSX.Element { return this.cachedData["Tab"] ?? this.updateCache("Tab"); }

    // FEEDBACK COMPONENTS
    public get ProgressBar(): (props: PropsProgressBar) => JSX.Element { return this.cachedData["ProgressBar"] ?? this.updateCache("ProgressBar"); }

    // DISPLAY COMPONENTS
    public get Modal(): (props: PropsModal) => JSX.Element { return this.cachedData["Modal"] ?? this.updateCache("Modal"); }
    public get Scrollable(): (props: PropsScrollable) => JSX.Element { return this.cachedData["Scrollable"] ?? this.updateCache("Scrollable"); }

    // FORM COMPONENTS
    public get FormGroup(): (props: PropsFormGroup) => JSX.Element { return this.cachedData["FormGroup"] ?? this.updateCache("FormGroup"); }

    // ASSET MENU COMPONENTS
    public get AssetGrid(): (props: any) => JSX.Element { return this.cachedData["AssetGrid"] ?? this.updateCache("AssetGrid"); }
    public get AssetItem(): (props: any) => JSX.Element { return this.cachedData["AssetItem"] ?? this.updateCache("AssetItem"); }
    public get assetGridTheme(): Theme | any { return this.cachedData["assetGridTheme"] ?? this.updateCache("assetGridTheme"); }

    // CHART COMPONENTS
    public get Chart(): (props: any) => JSX.Element { return this.cachedData["Chart"] ?? this.updateCache("Chart"); }
    public get LineChart(): (props: any) => JSX.Element { return this.cachedData["LineChart"] ?? this.updateCache("LineChart"); }
    public get BarChart(): (props: any) => JSX.Element { return this.cachedData["BarChart"] ?? this.updateCache("BarChart"); }

    // MENU COMPONENTS
    public get ContextMenu(): (props: any) => JSX.Element { return this.cachedData["ContextMenu"] ?? this.updateCache("ContextMenu"); }
    public get MenuItem(): (props: any) => JSX.Element { return this.cachedData["MenuItem"] ?? this.updateCache("MenuItem"); }

    // ANIMATION COMPONENTS
    public get Transition(): (props: any) => JSX.Element { return this.cachedData["Transition"] ?? this.updateCache("Transition"); }
    public get FadeIn(): (props: any) => JSX.Element { return this.cachedData["FadeIn"] ?? this.updateCache("FadeIn"); }

    // FOCUS MANAGEMENT
    public get FOCUS_DISABLED(): UniqueFocusKey { return this.cachedData["FOCUS_DISABLED"] ?? this.updateCache("FOCUS_DISABLED"); }
    public get FOCUS_AUTO(): UniqueFocusKey { return this.cachedData["FOCUS_AUTO"] ?? this.updateCache("FOCUS_AUTO"); }
    public get useUniqueFocusKey(): (focusKey: FocusKey, debugName: string) => UniqueFocusKey | null { return this.cachedData["useUniqueFocusKey"] ?? this.updateCache("useUniqueFocusKey"); }

    // UTILITY HOOKS
    public get useLocalization(): () => any { return this.cachedData["useLocalization"] ?? this.updateCache("useLocalization"); }
    public get useValue(): <T>(binding: any) => T { return this.cachedData["useValue"] ?? this.updateCache("useValue"); }
    public get bindValue(): <T>(group: string, name: string) => any { return this.cachedData["bindValue"] ?? this.updateCache("bindValue"); }

    // THEME UTILITIES
    public get themeVariables(): Theme | any { return this.cachedData["themeVariables"] ?? this.updateCache("themeVariables"); }
    public get colorPalette(): Theme | any { return this.cachedData["colorPalette"] ?? this.updateCache("colorPalette"); }
    public get gameMainScreenTheme(): Theme | any { return this.cachedData["gameMainScreenTheme"] ?? this.updateCache("gameMainScreenTheme"); }
}