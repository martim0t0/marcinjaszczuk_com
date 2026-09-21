const NO_FLASH_SCRIPT = `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`;

export function ThemeScript() {
  // Runs before first paint so the stored theme preference applies without a
  // flash of the wrong theme. Must stay as the first thing in <head>.
  return <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />;
}
