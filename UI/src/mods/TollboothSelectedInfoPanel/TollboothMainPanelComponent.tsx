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

const m_TollAmount$ = bindValue<string>(mod.id, "m_TollAmount");   
const m_TotalIncome$ = bindValue<string>(mod.id, "m_TotalIncome");



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

// This is working, but it's possible a better solution is possible.
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

    return (
        <>
            <InfoSection focusKey={CS2VanillaUIResolver.instance.FOCUS_DISABLED} disableFocus={true} >
                <InfoRow
                    left={"Toll Amount"}
                    right={m_TollAmount}
                    tooltip={"Testing"}
                    uppercase={true}
                    disableFocus={true}
                    subRow={false}
                    className={InfoRowTheme.infoRow}
                ></InfoRow>
                <InfoRow
                    left={"Total Income"}
                    right={m_TotalIncome}
                    tooltip={"Testing"}
                    uppercase={true}
                    disableFocus={true}
                    subRow={false}
                    className={InfoRowTheme.infoRow}
                ></InfoRow>
            </InfoSection>
        </>
    );
}
