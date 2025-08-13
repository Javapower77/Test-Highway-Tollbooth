import React, { useState, useCallback } from 'react';

// Default CSS classes theme (equivalent to Jue object)
const InfoLinkCSS = {
  "info-link": "info-link_Mpc item-focused_FuT",
  infoLink: "info-link_Mpc item-focused_FuT",
  row: "row_Q8R",
  ellipsis: "ellipsis_C0N",
  smallText: "smallText_DnB",
  uppercase: "uppercase_qZ8",
  icon: "icon_hE2",
  hint: "hint_IBf",
};

// Component props interface
interface InfoLinkProps {
  icon?: string;
  tooltip?: React.ReactNode;
  uppercase?: boolean;
  onSelect?: () => void;
  children: React.ReactNode;
  className?: string;
}

// Stop propagation handler (equivalent to Db)
const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation();
};

// Simple Info Link component (equivalent to tde function)
const InfoLinkComponent: React.FC<InfoLinkProps> = ({
  icon,
  tooltip,
  uppercase = false,
  onSelect,
  children,
  className
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    stopPropagation(e);
    onSelect?.();
  }, [onSelect]);

  const shouldShowTooltip = tooltip && (isHovered || isFocused);

  const finalClassName = [
    InfoLinkCSS.row,
    InfoLinkCSS.infoLink,
    uppercase && InfoLinkCSS.uppercase,
    className
  ].filter(Boolean).join(' ');

  return React.createElement("div", {
    style: { position: 'relative' }
  }, [
    React.createElement("div", {
      onFocus: handleFocus,
      onBlur: handleBlur,
      tabIndex: 0,
      key: "focus-wrapper"
    }, React.createElement("button", {
      className: finalClassName,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      "data-focused": isFocused,
    }, [
      // Info icon (always present)
      React.createElement("img", {
        src: "Media/Glyphs/ViewInfo.svg",
        className: InfoLinkCSS.icon,
        key: "info-icon",
        alt: "Info"
      }),
      
      // Custom icon (if provided)
      icon && React.createElement("img", {
        src: icon,
        className: InfoLinkCSS.icon,
        key: "custom-icon",
        alt: ""
      }),
      
      // Content with ellipsis
      React.createElement("div", {
        className: InfoLinkCSS.ellipsis,
        key: "content"
      }, children),
      
      // Hint indicator when focused
      isFocused && React.createElement("div", {
        className: InfoLinkCSS.hint,
        children: "Select",
        key: "hint"
      })
    ])),

    // Tooltip overlay
    shouldShowTooltip && React.createElement("div", {
      key: "tooltip",
      style: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        marginTop: '4px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        pointerEvents: 'none'
      }
    }, tooltip)
  ]);
};

// Export the component and theme
export const InfoLink = InfoLinkComponent;
export const InfoLinkTheme = InfoLinkCSS;
export default InfoLink;