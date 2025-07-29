// src/components/LanguageSwitcher.js
import { useLanguage } from '../../hooks/useLanguage';
import { Dropdown } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';

// Option 1: Default export (recommended for single component files)
export default function LanguageSwitcher() {
  const { currentLang, languages, setLanguage } = useLanguage();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="light" id="language-dropdown">
        <FaGlobe className="me-1" />
        {languages.find(lang => lang.code === currentLang)?.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {languages.map((lang) => (
          <Dropdown.Item 
            key={lang.code}
            active={currentLang === lang.code}
            onClick={() => setLanguage(lang.code)}
          >
            {lang.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

// Option 2: Named export (alternative)
// export function LanguageSwitcher() {
//   // ... same implementation
// }