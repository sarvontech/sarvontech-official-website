import re

with open('src/admin/pages/VisualPageBuilder.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add HTML rendering to block switch case
content = re.sub(
    r'(\s*case \'list\':.*?</div>\s*);\s*default:',
    r'\1;\n      case \'html\':\n        return (\n          <div className="relative group">\n            <div \n              style={block.styles || {}}\n              className="min-h-[50px] outline-none"\n              dangerouslySetInnerHTML={{ __html: block.content || \'<div style="padding: 20px; background: #f0f0f0; color: #333; text-align: center;">HTML Block (Edit in Properties)</div>\' }}\n            />\n          </div>\n        );\n      default:',
    content,
    flags=re.DOTALL
)

# 2. Add initial content for HTML block
content = re.sub(
    r'(if \(type === \'list\'\) \{ newBlock\.content = \[\'Item 1\', \'Item 2\'\]; \})',
    r'\1\n      if (type === \'html\') { newBlock.content = \'<div class="custom-html-block">\\n  <h1>Hello World</h1>\\n</div>\'; }',
    content
)

# 3. Add globalCss to state
content = re.sub(
    r'const \[isGlobalCodeOpen, setIsGlobalCodeOpen\] = useState\(false\);\n\s*const \[globalCss, setGlobalCss\] = useState\(\'\'\);\n\s*const \[globalJs, setGlobalJs\] = useState\(\'\'\);',
    r'const [globalCss, setGlobalCss] = useState(\'\');',
    content
)

# 4. Remove handleSaveGlobalCode
content = re.sub(
    r'\n\s*const handleSaveGlobalCode = async \(\) => \{.*?\n\s*\};\n',
    r'\n',
    content,
    flags=re.DOTALL
)

# 5. Remove Global CSS/JS Button from header
content = re.sub(
    r'<button\s*onClick=\{\(\) => setIsGlobalCodeOpen\(true\)\}\s*className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"\s*>\s*<Code className="w-4 h-4" />\s*<span>Global CSS/JS</span>\s*</button>',
    '',
    content,
    flags=re.DOTALL
)

# 6. Remove Global Code Modal from bottom
content = re.sub(
    r'\{\/\* GLOBAL CODE MODAL \*\/\}.*?\}\)\}',
    '',
    content,
    flags=re.DOTALL
)

# 7. Add style tag to DroppableCanvas
content = re.sub(
    r'(<SortableContext items=\{blocks\.filter\(b => !b\.parentId\)\.map\(b => b\.id\)\} strategy=\{verticalListSortingStrategy\}>)',
    r'\1\n                  {globalCss && <style dangerouslySetInnerHTML={{ __html: globalCss }} />}',
    content
)

with open('src/admin/pages/VisualPageBuilder.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patched VisualPageBuilder.jsx successfully')
