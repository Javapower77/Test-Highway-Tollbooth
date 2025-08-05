import { ModuleRegistry } from "cs2/modding";
import { Unit } from "cs2/l10n";

// Common format utility function types based on typical game UI needs
export interface FormatUtilsModule {
    // Number formatting functions
        formatNumber?: (value: number, decimals?: number) => string;
    formatInteger?: (value: number) => string;
    formatCurrency?: (value: number, currency?: string) => string;
    formatPercentage?: (value: number, decimals?: number) => string;
    
    // Unit formatting functions
    formatDistance?: (value: number, unit?: string) => string;
    formatArea?: (value: number, unit?: string) => string;
    formatWeight?: (value: number, unit?: string) => string;
    formatPower?: (value: number, unit?: string) => string;
    formatVolume?: (value: number, unit?: string) => string;
    
    // Time formatting functions
    formatTime?: (hours: number, minutes?: number, seconds?: number) => string;
    formatDuration?: (seconds: number) => string;
    formatDate?: (date: Date | number) => string;
    formatDateTime?: (date: Date | number) => string;
    
    // Game-specific formatting
    formatPopulation?: (value: number) => string;
    formatIncome?: (value: number, period?: 'hour' | 'month') => string;
    formatResource?: (value: number, resourceType?: string) => string;
    formatCapacity?: (current: number, max: number) => string;
    
    // Utility functions
    abbreviateNumber?: (value: number) => string;
    formatWithUnit?: (value: number, unit: Unit) => string;
    formatRange?: (min: number, max: number, unit?: Unit) => string;
    formatFraction?: (value: number, total: number, unit?: Unit) => string;
    
    // Getters for format settings
    getDecimalSeparator?: () => string;
    getThousandsSeparator?: () => string;
    getCurrencySymbol?: () => string;
    getDateFormat?: () => string;
    getTimeFormat?: () => string;
    
    // Setters for format settings
    setDecimalSeparator?: (separator: string) => void;
    setThousandsSeparator?: (separator: string) => void;
    setCurrencySymbol?: (symbol: string) => void;
    setDateFormat?: (format: string) => void;
    setTimeFormat?: (format: string) => void;
}

// Props interfaces for React components that might use format utilities
export interface FormatDisplayProps {
    value: number;
    format?: keyof FormatUtilsModule;
    unit?: Unit | string;
    decimals?: number;
    className?: string;
}

export interface CurrencyDisplayProps {
    amount: number;
    currency?: string;
    showSymbol?: boolean;
    className?: string;
}

export interface TimeDisplayProps {
    time: number | Date;
    format?: 'time' | 'date' | 'datetime' | 'duration';
    className?: string;
}

export interface RangeDisplayProps {
    min: number;
    max: number;
    unit?: Unit | string;
    separator?: string;
    className?: string;
}

export interface CapacityDisplayProps {
    current: number;
    max: number;
    unit?: Unit | string;
    showPercentage?: boolean;
    className?: string;
}

/**
 * Resolver for game-ui/common/utils/format.ts module
 * Provides access to formatting utility functions and components
 */
export class FormatUtilsResolver {
    public static get instance(): FormatUtilsResolver { 
        return this._instance!!; 
    }
    private static _instance?: FormatUtilsResolver;

    public static setRegistry(registry: ModuleRegistry) { 
        this._instance = new FormatUtilsResolver(registry); 
    }
    
    private registryData: ModuleRegistry;
    private cachedModule?: FormatUtilsModule;

    constructor(registry: ModuleRegistry) {
        this.registryData = registry;
    }

    /**
     * Gets the format utilities module with all formatting functions
     */
    public get formatUtils(): FormatUtilsModule {
        if (!this.cachedModule) {
            const moduleData = this.registryData.registry.get("game-ui/common/utils/format.ts");
            if (!moduleData) {
                console.warn("Format utilities module not found in registry, using fallback implementations");
                this.cachedModule = {};
            } else {
                this.cachedModule = moduleData as FormatUtilsModule;
            }
        }
        return this.cachedModule;
    }

    // Fallback implementations for missing functions
    private fallbackFormatNumber(value: number, decimals: number = 2): string {
        return value.toLocaleString(undefined, { 
            minimumFractionDigits: decimals, 
            maximumFractionDigits: decimals 
        });
    }

    private fallbackFormatInteger(value: number): string {
        return Math.round(value).toLocaleString();
    }

    private fallbackFormatCurrency(value: number, currency: string = '$'): string {
        return `${currency}${this.fallbackFormatNumber(value, 2)}`;
    }

    private fallbackFormatPercentage(value: number, decimals: number = 0): string {
        return `${this.fallbackFormatNumber(value, decimals)}%`;
    }

    private fallbackFormatRange(min: number, max: number, unit?: Unit | string): string {
        const minStr = this.fallbackFormatNumber(min);
        const maxStr = this.fallbackFormatNumber(max);
        const unitStr = unit ? ` ${unit}` : '';
        return `${minStr} - ${maxStr}${unitStr}`;
    }

    private fallbackFormatCapacity(current: number, max: number): string {
        return `${this.fallbackFormatInteger(current)}/${this.fallbackFormatInteger(max)}`;
    }

    private fallbackAbbreviateNumber(value: number): string {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
        }
        return value.toString();
    }

    // Getter functions for individual format utilities with fallbacks
    public get formatNumber(): (value: number, decimals?: number) => string {
        return this.formatUtils.formatNumber || this.fallbackFormatNumber.bind(this);
    }

    public get formatInteger(): (value: number) => string {
        return this.formatUtils.formatInteger || this.fallbackFormatInteger.bind(this);
    }

    public get formatCurrency(): (value: number, currency?: string) => string {
        return this.formatUtils.formatCurrency || this.fallbackFormatCurrency.bind(this);
    }

    public get formatPercentage(): (value: number, decimals?: number) => string {
        return this.formatUtils.formatPercentage || this.fallbackFormatPercentage.bind(this);
    }

    public get formatDistance(): (value: number, unit?: string) => string {
        return this.formatUtils.formatDistance || ((value: number, unit?: string) => 
            `${this.fallbackFormatNumber(value)} ${unit || 'units'}`);
    }

    public get formatArea(): (value: number, unit?: string) => string {
        return this.formatUtils.formatArea || ((value: number, unit?: string) => 
            `${this.fallbackFormatNumber(value)} ${unit || 'units²'}`);
    }

    public get formatWeight(): (value: number, unit?: string) => string {
        return this.formatUtils.formatWeight || ((value: number, unit?: string) => 
            `${this.fallbackFormatNumber(value)} ${unit || 'kg'}`);
    }

    public get formatPower(): (value: number, unit?: string) => string {
        return this.formatUtils.formatPower || ((value: number, unit?: string) => 
            `${this.fallbackFormatNumber(value)} ${unit || 'MW'}`);
    }

    public get formatVolume(): (value: number, unit?: string) => string {
        return this.formatUtils.formatVolume || ((value: number, unit?: string) => 
            `${this.fallbackFormatNumber(value)} ${unit || 'm³'}`);
    }

    public get formatTime(): (hours: number, minutes?: number, seconds?: number) => string {
        return this.formatUtils.formatTime || ((hours: number, minutes: number = 0, seconds: number = 0) => {
            const h = hours.toString().padStart(2, '0');
            const m = minutes.toString().padStart(2, '0');
            if (seconds > 0) {
                const s = seconds.toString().padStart(2, '0');
                return `${h}:${m}:${s}`;
            }
            return `${h}:${m}`;
        });
    }

    public get formatDuration(): (seconds: number) => string {
        return this.formatUtils.formatDuration || ((seconds: number) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            
            if (hours > 0) {
                return `${hours}h ${minutes}m ${secs}s`;
            } else if (minutes > 0) {
                return `${minutes}m ${secs}s`;
            } else {
                return `${secs}s`;
            }
        });
    }

    public get formatDate(): (date: Date | number) => string {
        return this.formatUtils.formatDate || ((date: Date | number) => {
            const d = typeof date === 'number' ? new Date(date) : date;
            return d.toLocaleDateString();
        });
    }

    public get formatDateTime(): (date: Date | number) => string {
        return this.formatUtils.formatDateTime || ((date: Date | number) => {
            const d = typeof date === 'number' ? new Date(date) : date;
            return d.toLocaleString();
        });
    }

    public get formatPopulation(): (value: number) => string {
        return this.formatUtils.formatPopulation || ((value: number) => 
            `${this.fallbackAbbreviateNumber(value)} citizens`);
    }

    public get formatIncome(): (value: number, period?: 'hour' | 'month') => string {
        return this.formatUtils.formatIncome || ((value: number, period: 'hour' | 'month' = 'month') => 
            `${this.fallbackFormatCurrency(value)}/${period}`);
    }

    public get formatResource(): (value: number, resourceType?: string) => string {
        return this.formatUtils.formatResource || ((value: number, resourceType?: string) => 
            `${this.fallbackFormatNumber(value)} ${resourceType || 'units'}`);
    }

    public get formatCapacity(): (current: number, max: number) => string {
        return this.formatUtils.formatCapacity || this.fallbackFormatCapacity.bind(this);
    }

    public get abbreviateNumber(): (value: number) => string {
        return this.formatUtils.abbreviateNumber || this.fallbackAbbreviateNumber.bind(this);
    }

    public get formatWithUnit(): (value: number, unit: Unit) => string {
        return this.formatUtils.formatWithUnit || ((value: number, unit: Unit) => 
            `${this.fallbackFormatNumber(value)} ${unit}`);
    }

    public get formatRange(): (min: number, max: number, unit?: Unit) => string {
        return this.formatUtils.formatRange || this.fallbackFormatRange.bind(this);
    }

    public get formatFraction(): (value: number, total: number, unit?: Unit) => string {
        return this.formatUtils.formatFraction || ((value: number, total: number, unit?: Unit) => {
            const percentage = this.fallbackFormatPercentage((value / total) * 100, 1);
            const unitStr = unit ? ` ${unit}` : '';
            return `${this.fallbackFormatInteger(value)}/${this.fallbackFormatInteger(total)}${unitStr} (${percentage})`;
        });
    }

    // Getter accessors for format settings with fallbacks
    public get getDecimalSeparator(): () => string {
        return this.formatUtils.getDecimalSeparator || (() => '.');
    }

    public get getThousandsSeparator(): () => string {
        return this.formatUtils.getThousandsSeparator || (() => ',');
    }

    public get getCurrencySymbol(): () => string {
        return this.formatUtils.getCurrencySymbol || (() => '$');
    }

    public get getDateFormat(): () => string {
        return this.formatUtils.getDateFormat || (() => 'MM/DD/YYYY');
    }

    public get getTimeFormat(): () => string {
        return this.formatUtils.getTimeFormat || (() => '24h');
    }

    // Setter accessors for format settings with no-op fallbacks
    public get setDecimalSeparator(): (separator: string) => void {
        return this.formatUtils.setDecimalSeparator || (() => {
            console.warn('setDecimalSeparator not available in format utilities');
        });
    }

    public get setThousandsSeparator(): (separator: string) => void {
        return this.formatUtils.setThousandsSeparator || (() => {
            console.warn('setThousandsSeparator not available in format utilities');
        });
    }

    public get setCurrencySymbol(): (symbol: string) => void {
        return this.formatUtils.setCurrencySymbol || (() => {
            console.warn('setCurrencySymbol not available in format utilities');
        });
    }

    public get setDateFormat(): (format: string) => void {
        return this.formatUtils.setDateFormat || (() => {
            console.warn('setDateFormat not available in format utilities');
        });
    }

    public get setTimeFormat(): (format: string) => void {
        return this.formatUtils.setTimeFormat || (() => {
            console.warn('setTimeFormat not available in format utilities');
        });
    }

    // Utility methods for common formatting operations
    public formatValue(value: number, type: keyof FormatUtilsModule, options?: any): string {
        try {
            const formatter = this.formatUtils[type] as any;
            if (typeof formatter === 'function') {
                return options ? formatter(value, options) : formatter(value);
            }
            return this.fallbackFormatNumber(value);
        } catch (error) {
            console.warn(`Error formatting value with ${type}:`, error);
            return this.fallbackFormatNumber(value);
        }
    }

    public formatMoneyPerMonth(value: number): string {
        return this.formatIncome(value, 'month');
    }

    public formatMoneyPerHour(value: number): string {
        return this.formatIncome(value, 'hour');
    }

    public formatPopulationCapacity(current: number, max: number): string {
        return this.formatCapacity(current, max);
    }

    public formatResourceAmount(value: number, resourceType: string): string {
        return this.formatResource(value, resourceType);
    }

    // React component helpers (if the module exports React components)
    public createFormatDisplay(props: FormatDisplayProps): JSX.Element {
        const { value, format = 'formatNumber', unit, decimals, className } = props;
        
        try {
            const formatter = this.formatUtils[format] as any;
            const formattedValue = typeof formatter === 'function' 
                ? formatter(value, decimals || unit) 
                : this.fallbackFormatNumber(value, decimals);
            
            return (
                <span className={className}>
                    {formattedValue}
                </span>
            );
        } catch (error) {
            console.warn(`Error in createFormatDisplay:`, error);
            return (
                <span className={className}>
                    {this.fallbackFormatNumber(value, decimals)}
                </span>
            );
        }
    }

    public createCurrencyDisplay(props: CurrencyDisplayProps): JSX.Element {
        const { amount, currency, showSymbol = true, className } = props;
        const formattedAmount = this.formatCurrency(amount, currency);
        
        return (
            <span className={className}>
                {formattedAmount}
            </span>
        );
    }

    public createTimeDisplay(props: TimeDisplayProps): JSX.Element {
        const { time, format = 'datetime', className } = props;
        let formattedTime: string;
        
        try {
            switch (format) {
                case 'time':
                    formattedTime = this.formatTime(
                        typeof time === 'number' ? Math.floor(time / 3600) : time.getHours(),
                        typeof time === 'number' ? Math.floor((time % 3600) / 60) : time.getMinutes()
                    );
                    break;
                case 'date':
                    formattedTime = this.formatDate(time);
                    break;
                case 'duration':
                    formattedTime = this.formatDuration(typeof time === 'number' ? time : time.getTime() / 1000);
                    break;
                default:
                    formattedTime = this.formatDateTime(time);
            }
        } catch (error) {
            console.warn(`Error in createTimeDisplay:`, error);
            formattedTime = time.toString();
        }
        
        return (
            <span className={className}>
                {formattedTime}
            </span>
        );
    }

    public createRangeDisplay(props: RangeDisplayProps): JSX.Element {
        const { min, max, unit, separator = ' - ', className } = props;
        
        try {
            const formattedRange = this.formatRange(min, max, unit as Unit);
            
            return (
                <span className={className}>
                    {formattedRange}
                </span>
            );
        } catch (error) {
            console.warn(`Error in createRangeDisplay:`, error);
            return (
                <span className={className}>
                    {this.fallbackFormatRange(min, max, unit)}
                </span>
            );
        }
    }

    public createCapacityDisplay(props: CapacityDisplayProps): JSX.Element {
        const { current, max, unit, showPercentage = false, className } = props;
        const capacityText = this.formatCapacity(current, max);
        const percentageText = showPercentage 
            ? ` (${this.formatPercentage((current / max) * 100, 1)})`
            : '';
        
        return (
            <span className={className}>
                {capacityText}{percentageText}
            </span>
        );
    }
}

// Export default instance for convenience
export const formatUtilsResolver = FormatUtilsResolver.instance;

// Export individual utility functions for direct use
export const useFormatUtils = () => {
    return FormatUtilsResolver.instance.formatUtils;
};

// Export React hooks for formatted values
export const useFormattedNumber = (value: number, decimals?: number) => {
    const formatUtils = useFormatUtils();
    return formatUtils.formatNumber ? formatUtils.formatNumber(value, decimals) : value.toLocaleString();
};

export const useFormattedCurrency = (value: number, currency?: string) => {
    const resolver = FormatUtilsResolver.instance;
    return resolver.formatCurrency(value, currency);
};

export const useFormattedTime = (hours: number, minutes?: number, seconds?: number) => {
    const resolver = FormatUtilsResolver.instance;
    return resolver.formatTime(hours, minutes, seconds);
};

export const useFormattedCapacity = (current: number, max: number) => {
    const resolver = FormatUtilsResolver.instance;
    return resolver.formatCapacity(current, max);
};