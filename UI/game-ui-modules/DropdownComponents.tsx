import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

// CSS class utility function (equivalent to cs() in the obfuscated code)
const cs = (...classes: (string | undefined | null | boolean | { [key: string]: boolean })[]): string => {
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

// Dropdown context interface
interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  selectedValue: any;
  setSelectedValue: (value: any) => void;
}

// Create context (equivalent to Y.createContext())
const DropdownContext = createContext<DropdownContextType | null>(null);

// Hook to use dropdown context (equivalent to Y.useContext())
const useDropdownContext = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdownContext must be used within a Dropdown component');
  }
  return context;
};

// Component props interfaces
interface DropdownProps {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  selectedValue?: any;
  onSelectionChange?: (value: any) => void;
  focusKey?: string;
}

interface DropdownToggleProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  focusKey?: string;
}

interface DropdownItemProps<T = any> {
  children: ReactNode;
  className?: string;
  value?: T;
  selected?: boolean;
  onClick?: (value: T) => void;
  focusKey?: string;
}

// Main Dropdown component (equivalent to fS() function)
export const Dropdown: React.FC<DropdownProps> = ({ 
  children, 
  className = '', 
  defaultOpen = false,
  selectedValue: controlledValue,
  onSelectionChange,
  focusKey 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState(controlledValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue;

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  };

  const setSelectedValue = (value: any) => {
    if (controlledValue === undefined) {
      setInternalValue(value);
    }
    onSelectionChange?.(value);
    close();
  };

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const contextValue: DropdownContextType = {
    isOpen,
    toggle,
    close,
    selectedValue,
    setSelectedValue,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div 
        ref={dropdownRef}
        className={cs('dropdown', className)}
        data-focus-key={focusKey}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Dropdown Toggle component (equivalent to bS() function) 
export const DropdownToggle: React.FC<DropdownToggleProps> = ({ 
  children, 
  className = '',
  disabled = false,
  focusKey 
}) => {
  const { toggle, isOpen } = useDropdownContext();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      toggle();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        toggle();
      }
    }
  };

  return (
    <button
      type="button"
      className={cs(
        'dropdown-toggle',
        'dropdown-toggle_prl', // CSS class from the game
        { 
          'active': isOpen,
          'disabled': disabled 
        },
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-expanded={isOpen}
      aria-haspopup="true"
      data-focus-key={focusKey}
    >
      <div className={cs('dropdown-label')}>
        {children}
      </div>
      <div className={cs('dropdown-indicator')}>
        <svg width="12" height="8" viewBox="0 0 12 8">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </button>
  );
};

// Dropdown Menu component (equivalent to xS() function)
export const DropdownMenu: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  const { isOpen } = useDropdownContext();

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className={cs('dropdown-popup', 'dropdown-popup_mMv', className)}
      role="menu"
    >
      <div className={cs('dropdown-menu', 'dropdown-menu_Swd')}>
        {children}
      </div>
    </div>
  );
};

// Dropdown Item component
export const DropdownItem: React.FC<DropdownItemProps> = ({ 
  children, 
  className = '',
  value,
  selected = false,
  onClick,
  focusKey 
}) => {
  const { setSelectedValue, selectedValue } = useDropdownContext();

  const isSelected = selected || selectedValue === value;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (value !== undefined) {
      setSelectedValue(value);
    }
    
    onClick?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  return (
    <div
      className={cs(
        'dropdown-item',
        'dropdown-item_t3P', // CSS class from the game
        { 'selected': isSelected },
        className
      )}
      role="menuitem"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-focus-key={focusKey}
    >
      {children}
    </div>
  );
};

// Utility function for creating dropdown items (dS() equivalent)
export const createDropdownItem = <T,>(value: T, displayName: string, selected?: boolean) => ({
  value,
  displayName,
  selected: selected || false,
});

// Export all components
export { useDropdownContext };