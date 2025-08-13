import React, { useState, useCallback, useRef, useEffect, useMemo, useContext } from 'react';

// CSS theme classes for Notification components (equivalent to vme object)
export const NotificationTheme = {
  notification: "notification_CLy item-focused_FuT",
  "full-width": "full-width_Qk1",
  fullWidth: "full-width_Qk1",
  icon: "icon_UMr",
  label: "label_RLF",
  badge: "badge_ooc",
  "badge-icon": "badge-icon_ubF",
  badgeIcon: "badge-icon_ubF",
};

// Component interfaces
export interface NotificationData {
  key: string;
  iconPath: string;
  count?: number;
}

export interface NotificationProps {
  notification: NotificationData;
  anchorElRef?: React.RefObject<HTMLElement>;
  tooltipTags?: string[];
  className?: string;
}

export interface TooltipProps {
  tooltip?: React.ReactNode;
  forceVisible?: boolean;
  disabled?: boolean;
  theme?: any;
  direction?: string;
  alignment?: string;
  className?: string;
  children: React.ReactNode;
  anchorElRef?: React.RefObject<HTMLElement>;
}

export interface ActiveFocusDivProps {
  focusKey?: string;
  debugName?: string;
  activation?: string;
  focusSound?: string;
  className?: string;
  children: React.ReactNode;
  onFocusChange?: (focused: boolean) => void;
}

export interface FormattedParagraphProps {
  focusKey?: string;
  text?: string;
  theme?: any;
  renderer?: any;
  className?: string;
  children?: React.ReactNode;
  onLinkSelect?: (link: string) => void;
  selectAction?: string;
  maxLineLength?: number;
  splitLineLength?: number;
}

export interface NotificationBadgeProps {
  className?: string;
  children: React.ReactNode;
}

// CSS class utility function
const classNames = (...classes: (string | undefined | null | boolean)[]): string => {
  return classes
    .filter((cls) => cls)
    .map((cls) => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .join(' ')
    .trim();
};

// Localization context mock (equivalent to _c)
const LocalizationContext = {
  Notifications: {
    DESCRIPTION: ({ hash }: { hash: string }) => `Notification description for ${hash}`,
    TITLE: ({ hash }: { hash: string }) => `Notification title for ${hash}`,
  },
  SelectedInfoPanel: {
    CITIZEN_HAPPINESS_DESCRIPTION: ({ hash }: { hash: string }) => `Happiness description for ${hash}`,
    CITIZEN_HAPPINESS_TITLE: ({ hash }: { hash: string }) => `Happiness for ${hash}`,
    CITIZEN_HAPPINESS_TITLE_MALE: ({ hash }: { hash: string }) => `Male happiness for ${hash}`,
    CITIZEN_HAPPINESS_TITLE_FEMALE: ({ hash }: { hash: string }) => `Female happiness for ${hash}`,
    CITIZEN_CONDITION_DESCRIPTION: ({ hash }: { hash: string }) => `Condition description for ${hash}`,
    CITIZEN_CONDITION_TITLE_MALE: ({ hash }: { hash: string }) => `Male condition for ${hash}`,
    CITIZEN_CONDITION_TITLE_FEMALE: ({ hash }: { hash: string }) => `Female condition for ${hash}`,
    COMPANY_PROFITABILITY_TITLE: ({ hash }: { hash: string }) => `Profitability for ${hash}`,
  }
};

// Value formatter component mock (equivalent to Oc)
const ValueFormatter: React.FC<{ value: number }> = ({ value }) => {
  return React.createElement("span", {}, value.toString());
};

// Image component mock (equivalent to Z_)
const Image: React.FC<{ src: string; className?: string }> = ({ src, className }) => {
  return React.createElement("img", {
    src: src,
    className: className,
    alt: ""
  });
};

// Tooltip component (equivalent to Eg)
export const Tooltip: React.FC<TooltipProps> = ({
  tooltip,
  forceVisible = false,
  disabled = false,
  theme,
  direction = "top",
  alignment = "center",
  className,
  children,
  anchorElRef
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleFocusChange = useCallback((focused: boolean) => {
    setIsFocused(focused);
  }, []);

  useEffect(() => {
    const element = anchorElRef?.current || elementRef.current;
    if (element) {
      element.addEventListener("mouseover", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
      element.addEventListener("mousedown", handleMouseDown);
      
      return () => {
        element.removeEventListener("mouseover", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
        element.removeEventListener("mousedown", handleMouseDown);
      };
    }
  }, [anchorElRef, handleMouseEnter, handleMouseLeave, handleMouseDown]);

  const shouldShowTooltip = !disabled && tooltip && (forceVisible || isHovered || isFocused);
  const hasChildren = React.Children.count(children) > 0;

    return React.createElement(React.Fragment, {}, [
        React.createElement(FocusBoundary, {
            onFocusChange: handleFocusChange,
            key: "focus-boundary",
            children: React.createElement("div", {
                ref: elementRef,
                style: { position: 'relative' }
            }, [
                children,
                shouldShowTooltip && hasChildren && React.createElement("div", {
                    key: "tooltip",
                    className: classNames("tooltip-container", className),
                    style: {
                        position: 'absolute',
                        top: direction === 'bottom' ? '100%' : undefined,
                        bottom: direction === 'top' ? '100%' : undefined,
                        left: alignment === 'center' ? '50%' : undefined,
                        right: direction === 'right' ? '100%' : undefined,
                        transform: alignment === 'center' ? 'translateX(-50%)' : undefined,
                        zIndex: 1000,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        whiteSpace: 'nowrap',
                        marginTop: direction === 'bottom' ? '4px' : undefined,
                        marginBottom: direction === 'top' ? '4px' : undefined,
                        marginLeft: direction === 'right' ? '4px' : undefined,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        pointerEvents: 'none'
                    }
                }, tooltip)
            ])
        })
    ]);
};

// Focus Boundary component
export const FocusBoundary: React.FC<{
  children: React.ReactNode;
  onFocusChange?: (focused: boolean) => void;
}> = ({ children, onFocusChange }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setFocused(true);
    onFocusChange?.(true);
  }, [onFocusChange]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    onFocusChange?.(false);
  }, [onFocusChange]);

  return React.createElement("div", {
    onFocus: handleFocus,
    onBlur: handleBlur,
    tabIndex: 0,
  }, children);
};

// Active Focus Div component (equivalent to Sp)
export const ActiveFocusDiv: React.FC<ActiveFocusDivProps> = ({
  focusKey,
  debugName = "ActiveFocusDiv",
  activation = "Always",
  focusSound,
  className,
  children,
  onFocusChange,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleFocusChange = useCallback((isFocused: boolean) => {
    setFocused(isFocused);
    onFocusChange?.(isFocused);
  }, [onFocusChange]);

    return React.createElement(FocusBoundary, {
        onFocusChange: handleFocusChange,
        children: React.createElement("div", {
            ...props,
            ref: elementRef,
            className: classNames(className, focused && "focused"),
        }, children)
    });
};

// Formatted Paragraphs component (equivalent to Cb)
export const FormattedParagraphs: React.FC<FormattedParagraphProps> = ({
  focusKey,
  text,
  theme,
  renderer,
  className,
  children,
  onLinkSelect,
  selectAction,
  maxLineLength,
  splitLineLength,
  ...props
}) => {
  const content = useMemo(() => {
    return React.Children.count(children) > 0 ? children : text;
  }, [children, text]);

  const defaultTheme = useMemo(() => ({
    paragraphs: "formatted-paragraphs",
    ...theme
  }), [theme]);

  return React.createElement("div", {
    ...props,
    className: classNames(defaultTheme.paragraphs, className),
  }, content);
};

// Notification Badge component (equivalent to yme)
export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  className,
  children
}) => {
  return React.createElement("div", {
    className: classNames(NotificationTheme.badge, className),
  }, [
    children,
    React.createElement(Image, {
      src: "Media/Game/Icons/Citizen.svg",
      className: NotificationTheme.badgeIcon,
      key: "badge-icon"
    })
  ]);
};

// Main Notification component (equivalent to bme)
export const Notification: React.FC<NotificationProps> = ({
  notification,
  anchorElRef,
  className
}) => {
    return React.createElement(Tooltip, {
        direction: "right",
        alignment: "center",
        anchorElRef: anchorElRef,
        tooltip: React.createElement(FormattedParagraphs, {
            children: React.createElement(LocalizationContext.Notifications.DESCRIPTION, {
                hash: notification.key
            })
        }),
        children: React.createElement(ActiveFocusDiv, {
            className: classNames(NotificationTheme.notification, NotificationTheme.fullWidth, className),
            children: [
                React.createElement("img", {
                    src: notification.iconPath,
                    className: NotificationTheme.icon,
                    key: "icon",
                    alt: ""
                }),
                React.createElement("div", {
                    className: NotificationTheme.label,
                    key: "label"
                }, [
                    React.createElement(LocalizationContext.Notifications.TITLE, {
                        hash: notification.key,
                        key: "title"
                    }),
                    notification.count && notification.count > 1 && React.createElement(NotificationBadge, {
                        className: NotificationTheme.badge,
                        children: React.createElement(ValueFormatter, { value: notification.count }),
                        key: "badge"
                    })
                ])
            ]
        })
    });
};

// Happiness Notification component (equivalent to Tme)
export const HappinessNotification: React.FC<NotificationProps> = ({
  notification,
  anchorElRef,
  tooltipTags,
  className
}) => {
  const isMale = tooltipTags?.includes("Male");

    return React.createElement(React.Fragment, {}, React.createElement(Tooltip, {
        direction: "right",
        alignment: "center",
        anchorElRef: anchorElRef,
        tooltip: React.createElement(FormattedParagraphs, {
            children: React.createElement(LocalizationContext.SelectedInfoPanel.CITIZEN_HAPPINESS_DESCRIPTION, {
                hash: notification.key
            })
        }),
        children: React.createElement(ActiveFocusDiv, {
            className: classNames(NotificationTheme.notification, className),
            children: [
                React.createElement("img", {
                    src: notification.iconPath,
                    className: NotificationTheme.icon,
                    key: "icon",
                    alt: ""
                }),
                React.createElement("div", {
                    className: NotificationTheme.label,
                    key: "label"
                }, isMale ?
                    React.createElement(LocalizationContext.SelectedInfoPanel.CITIZEN_HAPPINESS_TITLE_MALE, {
                        hash: notification.key
                    }) :
                    React.createElement(LocalizationContext.SelectedInfoPanel.CITIZEN_HAPPINESS_TITLE_FEMALE, {
                        hash: notification.key
                    })
                )
            ]
        })
    }));
};

// Average Happiness Notification component (equivalent to Eme)
export const AverageHappinessNotification: React.FC<NotificationProps> = ({
  notification,
  className
}) => {
    return React.createElement(ActiveFocusDiv, {
        className: classNames(NotificationTheme.notification, className),
        children: [
            React.createElement("img", {
                src: notification.iconPath,
                className: NotificationTheme.icon,
                key: "icon",
                alt: ""
            }),
            React.createElement("div", {
                className: NotificationTheme.label,
                key: "label"
            }, React.createElement(LocalizationContext.SelectedInfoPanel.CITIZEN_HAPPINESS_TITLE, {
                hash: notification.key
            }))
        ]
    });
};

// Profitability Notification component (equivalent to Ime)
export const ProfitabilityNotification: React.FC<NotificationProps> = ({
  notification,
  className
}) => {
    return React.createElement(ActiveFocusDiv, {
        className: classNames(NotificationTheme.notification, className),
        children: [
            React.createElement("img", {
                src: notification.iconPath,
                className: NotificationTheme.icon,
                key: "icon",
                alt: ""
            }),
            React.createElement("div", {
                className: NotificationTheme.label,
                key: "label"
            }, React.createElement(LocalizationContext.SelectedInfoPanel.COMPANY_PROFITABILITY_TITLE, {
                hash: notification.key
            }))
        ]
    });
};

// Condition Notification component (equivalent to Sme)
export const ConditionNotification: React.FC<NotificationProps> = ({
    notification,
    anchorElRef,
    tooltipTags,
    className
}) => {
    const isMale = tooltipTags?.includes("Male");

    return React.createElement(Tooltip, {
        direction: "right",
        alignment: "center",
        anchorElRef: anchorElRef,
        tooltip: React.createElement(FormattedParagraphs, {
            children: React.createElement(LocalizationContext.SelectedInfoPanel.CITIZEN_CONDITION_DESCRIPTION, {
                hash: notification.key
            })
        }),
        children: React.createElement(ActiveFocusDiv, {
            className: classNames(NotificationTheme.notification, className),
            children: [
                React.createElement("img", {
                    src: notification.iconPath,
                    className: NotificationTheme.icon,
                    key: "icon",
                    alt: ""
                }),
                React.createElement("div", {
                    className: NotificationTheme.label,
                    key: "label"
                }, isMale ?
                    React.createElement(LocalizationContext.SelectedInfoPanel.CITIZEN_CONDITION_TITLE_MALE, {
                        hash: notification.key
                    }) :
                    React.createElement(LocalizationContext.SelectedInfoPanel.CITIZEN_CONDITION_TITLE_FEMALE, {
                        hash: notification.key
                    })
                )
            ]
        })
    });
};

// Export utility functions and themes
export { classNames };

// Export all components
export default {
  Notification,
  HappinessNotification,
  AverageHappinessNotification,
  ProfitabilityNotification,
  ConditionNotification,
  NotificationBadge,
  NotificationTheme
};