import { getModule } from "cs2/modding";
import { Theme, Color } from "cs2/bindings";
import { bindValue, trigger, useValue } from "cs2/api";
import { useLocalization } from "cs2/l10n";
import mod from "../../../mod.json";
import { tool } from "cs2/bindings";
import { Button } from "cs2/ui";
import { Entity } from "cs2/utils";
import { FocusDisabled } from "cs2/input";
import { CS2VanillaUIResolver } from "mods/CS2VanillaUIResolver";
import {
    formatLargeNumber,
    useFormattedLargeNumber,
    makePretty,
    makePrettyUppercase,
    formatInteger,
    capitalize,
    formatFixedLengthInt
} from '../../../game-ui-modules/format';
import { TextInput } from "../../../game-ui-modules/text-input";


import { Unit } from "cs2/l10n";
import styles from "mods/TollboothSelectedInfoPanel/TollboothMainPanelComponent.module.scss";
import { useState, useMemo } from "react";

const m_TollAmount$ = bindValue<string>(mod.id, "m_TollAmount");   
const m_TotalIncome$ = bindValue<string>(mod.id, "m_TotalIncome");

// Your existing image imports...
const uilJavapower = "coui://javapower-test-toll-highways/";
const AdministrationVehicle01Src = uilJavapower + "CarPrefab.AdministrationVehicle01.png";
const Bus01Src = uilJavapower + "CarPrefab.Bus01.png";
const Bus02Src = uilJavapower + "CarPrefab.Bus02.png";
const Bus03Src = uilJavapower + "CarPrefab.Bus03.png";
const BusCO01Src = uilJavapower + "CarPrefab.BusCO01.png";
const BusCO02Src = uilJavapower + "CarPrefab.BusCO02.png";
const Car01Src = uilJavapower + "CarPrefab.Car01.png";
const Car02Src = uilJavapower + "CarPrefab.Car02.png";
const Car03Src = uilJavapower + "CarPrefab.Car03.png";
const Car04Src = uilJavapower + "CarPrefab.Car04.png";
const Car05Src = uilJavapower + "CarPrefab.Car05.png";
const Car06Src = uilJavapower + "CarPrefab.Car06.png";
const Car07Src = uilJavapower + "CarPrefab.Car07.png";
const Car08Src = uilJavapower + "CarPrefab.Car08.png";
const Car09Src = uilJavapower + "CarPrefab.Car09.png";
const CoalTruck01Src = uilJavapower + "CarPrefab.CoalTruck01.png";
const EU_Ambulance01Src = uilJavapower + "CarPrefab.EU_Ambulance01.png";
const EU_DeliveryVan01Src = uilJavapower + "CarPrefab.EU_DeliveryVan01.png";
const EU_FireTruck01Src = uilJavapower + "CarPrefab.EU_FireTruck01.png";
const EU_GarbageTruck01Src = uilJavapower + "CarPrefab.EU_GarbageTruck01.png";
const EU_PoliceVehicle01Src = uilJavapower + "CarPrefab.EU_PoliceVehicle01.png";
const EU_PoliceVehicle02Src = uilJavapower + "CarPrefab.EU_PoliceVehicle02.png";
const EU_PostVan01Src = uilJavapower + "CarPrefab.EU_PostVan01.png";
const EU_Snowplow01Src = uilJavapower + "CarPrefab.EU_Snowplow01.png";
const EU_TruckTractor01Src = uilJavapower + "CarPrefab.EU_TruckTractor01.png";
const ForestForwarder01Src = uilJavapower + "CarPrefab.ForestForwarder01.png";
const Hearse01Src = uilJavapower + "CarPrefab.Hearse01.png";
const Motorbike01Src = uilJavapower + "CarPrefab.Motorbike01.png";
const MotorbikeDelivery01 = uilJavapower + "CarPrefab.MotorbikeDelivery01.png";
const MuscleCar01Src = uilJavapower + "CarPrefab.MuscleCar01.png";
const MuscleCar02Src = uilJavapower + "CarPrefab.MuscleCar02.png";
const MuscleCar03Src = uilJavapower + "CarPrefab.MuscleCar03.png";
const MuscleCar04Src = uilJavapower + "CarPrefab.MuscleCar04.png";
const MuscleCar05Src = uilJavapower + "CarPrefab.MuscleCar05.png";
const NA_Ambulance01Src = uilJavapower + "CarPrefab.NA_Ambulance01.png";
const NA_DeliveryVan01Src = uilJavapower + "CarPrefab.NA_DeliveryVan01.png";
const NA_FireTruck01Src = uilJavapower + "CarPrefab.NA_FireTruck01.png";
const NA_GarbageTruck01Src = uilJavapower + "CarPrefab.NA_GarbageTruck01.png";
const NA_PoliceVehicle01Src = uilJavapower + "CarPrefab.NA_PoliceVehicle01.png";
const NA_PoliceVehicle02Src = uilJavapower + "CarPrefab.NA_PoliceVehicle02.png";
const NA_PostVan01Src = uilJavapower + "CarPrefab.NA_PostVan01.png";
const NA_Snowplow01Src = uilJavapower + "CarPrefab.NA_Snowplow01.png";
const NA_TruckTractor01Src = uilJavapower + "CarPrefab.NA_TruckTractor01.png";
const OilTruck01Src = uilJavapower + "CarPrefab.OilTruck01.png";
const OreMiningTruck01Src = uilJavapower + "CarPrefab.OreMiningTruck01.png";
const ParkMaintenanceVehicle01Src = uilJavapower + "CarPrefab.ParkMaintenanceVehicle01.png";
const PrisonVan01Src = uilJavapower + "CarPrefab.PrisonVan01.png";
const RoadMaintenanceVehicle01Src = uilJavapower + "CarPrefab.RoadMaintenanceVehicle01.png";
const Scooter01Src = uilJavapower + "CarPrefab.Scooter01.png";
const Taxi01Src = uilJavapower + "CarPrefab.Taxi01.png";
const Taxi02Src = uilJavapower + "CarPrefab.Taxi02.png";
const Tractor01Src = uilJavapower + "CarPrefab.Tractor01.png";
const Van01Src = uilJavapower + "CarPrefab.Van01.png";
const CarTrailer01Src = uilJavapower + "CarTrailerPrefab.CarTrailer01.png";
const TruckTrailer01Src = uilJavapower + "CarTrailerPrefab.TruckTrailer01.png";
const EconomySrc = uilJavapower + "Economy.svg";
const MoneySrc = uilJavapower + "Money.svg";
const RouteTicketPriceSrc = uilJavapower + "RouteTicketPrice.svg";


// Vehicle type definitions for dropdowns
interface VehicleType {
    id: string;
    name: string;
    toll: number;
    icon?: string;
}














export const InfoRowTheme: Theme | any = getModule(
    "game-ui/game/components/selected-info-panel/shared-components/info-row/info-row.module.scss",
    "classes"
)

export const InfoSection: any = getModule(
    "game-ui/game/components/selected-info-panel/shared-components/info-section/info-section.tsx",
    "InfoSection"
)

export const InfoRow: any = getModule(
    "game-ui/game/components/selected-info-panel/shared-components/info-row/info-row.tsx",
    "InfoRow"
)

export const descriptionToolTipStyle = getModule("game-ui/common/tooltip/description-tooltip/description-tooltip.module.scss", "classes");

export const roundButtonHighlightStyle = getModule("game-ui/common/input/button/themes/round-highlight-button.module.scss", "classes");

// Tooltip component
export function DescriptionTooltip(tooltipTitle: string | null, tooltipDescription: string | null): JSX.Element {
    return (
        <>
            <div className={descriptionToolTipStyle.title}>{tooltipTitle}</div>
            <div className={descriptionToolTipStyle.content}>{tooltipDescription}</div>
        </>
    );
}


export const TollboothMainPanelComponent = () => {
    const m_TollAmount = useValue(m_TollAmount$);
    const m_TotalIncome = useValue(m_TotalIncome$);
    console.log("TollboothMainPanelComponent called", m_TollAmount, m_TotalIncome);

    // Additional values for progress bar examples
    const m_VehiclesPassed = 125;
    const m_DailyTarget = 500;
    const m_MaintenanceLevel = 85;
    const m_TrafficLoad = 65;
    const m_CollectionEfficiency = 92;

    const vehicleTypes: VehicleType[] = [
        { id: 'car', name: 'Personal Vehicle', toll: 5.0, icon: Car01Src },
        { id: 'bus', name: 'Public Bus', toll: 15.0, icon: Bus01Src },
        { id: 'truck', name: 'Freight Truck', toll: 25.0, icon: NA_TruckTractor01Src },
        { id: 'emergency', name: 'Emergency Vehicle', toll: 0.0, icon: EU_Ambulance01Src },
        { id: 'service', name: 'Service Vehicle', toll: 10.0, icon: NA_PostVan01Src },
    ];

    const qualityOptions = [
        { id: 'low', name: 'Low Quality', description: 'Basic toll collection' },
        { id: 'medium', name: 'Medium Quality', description: 'Standard toll collection' },
        { id: 'high', name: 'High Quality', description: 'Advanced toll collection' },
        { id: 'ultra', name: 'Ultra Quality', description: 'Premium toll collection' },
    ];


    // State for dropdowns
    const [selectedQuality, setSelectedQuality] = useState('high');
    const [selectedVehicleType, setSelectedVehicleType] = useState('car');
    const [selectedTollRate, setSelectedTollRate] = useState(5.0);

    // Handle quality selection
    const handleQualityChange = (value: string) => {
        console.log("Quality changed to:", value);
        setSelectedQuality(value);
        // Trigger any backend updates here
        trigger(mod.id, "setTollboothQuality", value);
    };

    // Handle vehicle type selection
    const handleVehicleTypeChange = (value: string) => {
        console.log("Vehicle type changed to:", value);
        setSelectedVehicleType(value);
        const vehicle = vehicleTypes.find(v => v.id === value);
        if (vehicle) {
            setSelectedTollRate(vehicle.toll);
            // Trigger backend update for toll rates
            trigger(mod.id, "setVehicleTollRate", value, vehicle.toll);
        }
    };

    const getCurrentQualityName = () => {
        const quality = qualityOptions.find(q => q.id === selectedQuality);
        return quality?.name || 'Unknown';
    };

    const getCurrentVehicleName = () => {
        const vehicle = vehicleTypes.find(v => v.id === selectedVehicleType);
        return vehicle?.name || 'Unknown';
    };

    return (
        <>
            {/* Basic Information Section */}
            <InfoSection focusKey={CS2VanillaUIResolver.instance.FOCUS_DISABLED} disableFocus={true}>
                <InfoRow
                    left={"Toll Amount"}
                    right={m_TollAmount}
                    tooltip={ DescriptionTooltip("Current Toll Amount", "The toll amount for the selected vehicle type") }
                    uppercase={true}
                    disableFocus={true}
                    subRow={false}
                    className={InfoRowTheme.infoRow}
                />
                <InfoRow
                    left={"Total Income"}
                    right={m_TotalIncome}
                    tooltip={DescriptionTooltip("Total Income", "Total revenue generated by this tollbooth")}
                    uppercase={true}
                    disableFocus={true}
                    subRow={false}
                    className={InfoRowTheme.infoRow}
                />
            </InfoSection>

            {/* Capacity Bars Section */}
            <InfoSection focusKey={CS2VanillaUIResolver.instance.FOCUS_DISABLED} disableFocus={true}>
                {/* Daily Vehicle Target Progress */}
                <InfoRow
                    left={"Daily Vehicle Target"}
                    tooltip={DescriptionTooltip("Current Toll Amount", "The toll amount for the selected vehicle type")}
                    uppercase={true}
                    disableFocus={true}
                    subRow={false}
                    className={InfoRowTheme.infoRow}
                />
                <CS2VanillaUIResolver.instance.CapacityBar
                    progress={m_VehiclesPassed}
                    max={m_DailyTarget}
                    invertColorCodes={false}
                    children={<span>{m_VehiclesPassed} / {m_DailyTarget} vehicles</span>}
                />
            </InfoSection>

            {/* DropDown Section */}
            <InfoSection focusKey={CS2VanillaUIResolver.instance.FOCUS_DISABLED} disableFocus={true}>
                <InfoRow
                    left={"Tollbooth Quality"}
                    right={
                        <CS2VanillaUIResolver.instance.Dropdown
                            selectedValue={selectedQuality}
                            onSelectionChange={handleQualityChange}
                            focusKey="tollbooth-quality-dropdown"
                        >
                            <CS2VanillaUIResolver.instance.DropdownToggle focusKey="tollbooth-quality-toggle">
                                {getCurrentQualityName()}
                            
                            
                                {qualityOptions.map(option => (
                                    <CS2VanillaUIResolver.instance.DropdownItem
                                        key={option.id}
                                        value={option.id}
                                        selected={option.id === selectedQuality}
                                        
                                    >
                                        <div>
                                            <strong>{option.name}</strong>
                                            <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
                                                {option.description}
                                            </div>
                                        </div>
                                    </CS2VanillaUIResolver.instance.DropdownItem>
                                ))}
                            </CS2VanillaUIResolver.instance.DropdownToggle>
                        </CS2VanillaUIResolver.instance.Dropdown>
                    }
                    tooltip={DescriptionTooltip("Tollbooth Quality", "Higher quality tollbooths process vehicles faster and generate more revenue")}
                    uppercase={true}
                    disableFocus={true}
                    subRow={false}
                    className={InfoRowTheme.infoRow}
                />

                <InfoRow
                    left={"Vehicle Type Rates"}
                    right={
                        <CS2VanillaUIResolver.instance.Dropdown
                            selectedValue={selectedVehicleType}
                            onSelectionChange={handleVehicleTypeChange}
                            focusKey="vehicle-type-dropdown"
                        >
                            <CS2VanillaUIResolver.instance.DropdownToggle focusKey="vehicle-type-toggle">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {vehicleTypes.find(v => v.id === selectedVehicleType)?.icon && (
                                        <img
                                            src={vehicleTypes.find(v => v.id === selectedVehicleType)?.icon}
                                            style={{ width: '24px', height: '24px' }}
                                            alt=""
                                        />
                                    )}
                                    <span>{getCurrentVehicleName()}</span>
                                    <span style={{ marginLeft: 'auto', opacity: 0.8 }}>
                                        ${selectedTollRate.toFixed(2)}
                                    </span>
                                </div>
                            
                            
                                {vehicleTypes.map(vehicle => (
                                    <CS2VanillaUIResolver.instance.DropdownItem
                                        key={vehicle.id}
                                        value={vehicle.id}
                                        selected={vehicle.id === selectedVehicleType}
                                        
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                                            {vehicle.icon && (
                                                <img
                                                    src={vehicle.icon}
                                                    style={{ width: '32px', height: '32px' }}
                                                    alt=""
                                                />
                                            )}
                                            <div style={{ flex: 1 }}>
                                                <div><strong>{vehicle.name}</strong></div>
                                                <div style={{ fontSize: '0.9em', opacity: 0.8 }}>
                                                    Toll: ${vehicle.toll.toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </CS2VanillaUIResolver.instance.DropdownItem>
                                ))}
                            
                            </CS2VanillaUIResolver.instance.DropdownToggle>
                        </CS2VanillaUIResolver.instance.Dropdown>
                    }
                    tooltip={DescriptionTooltip("Vehicle Type Rates", "Configure toll rates for different vehicle types")}
                    uppercase={true}
                    disableFocus={true}
                    subRow={false}
                    className={InfoRowTheme.infoRow}
                />
            </InfoSection>

        </>
    );
}
