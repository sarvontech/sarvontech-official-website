import re

with open('src/admin/pages/VisualPageBuilder.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add icons
content = re.sub(
    r'import \{ (.*?) \} from \'lucide-react\';',
    r'import { \1, Undo2, Redo2 } from \'lucide-react\';',
    content
)

# 2. Add past/future state and history function
history_code = """  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);

  const updateBlocksWithHistory = (newBlocksOrUpdater) => {
    setBlocks((currentBlocks) => {
      const nextBlocks = typeof newBlocksOrUpdater === 'function' ? newBlocksOrUpdater(currentBlocks) : newBlocksOrUpdater;
      if (JSON.stringify(currentBlocks) !== JSON.stringify(nextBlocks)) {
        setPast((prev) => [...prev, currentBlocks]);
        setFuture([]);
      }
      return nextBlocks;
    });
  };

  const handleUndo = () => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast((prev) => prev.slice(0, prev.length - 1));
    setFuture((prev) => [blocks, ...prev]);
    setBlocks(previous);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((prev) => prev.slice(1));
    setPast((prev) => [...prev, blocks]);
    setBlocks(next);
  };
"""

content = re.sub(
    r'  const \[blocks, setBlocks\] = useState\(\[\]\);\n',
    r'  const [blocks, setBlocks] = useState([]);\n' + history_code,
    content
)

# 3. Replace setBlocks with updateBlocksWithHistory where needed
# Be careful not to replace lines 409 and 411 which are initialization.
content = re.sub(
    r'      setBlocks\(\(items\) => \{',
    r'      updateBlocksWithHistory((items) => {',
    content
)
content = re.sub(
    r'       setBlocks\(\(items\) => \{',
    r'       updateBlocksWithHistory((items) => {',
    content
)
content = re.sub(
    r'    setBlocks\(blocks\.map',
    r'    updateBlocksWithHistory(blocks.map',
    content
)
content = re.sub(
    r'        setBlocks\(blocks\.filter',
    r'        updateBlocksWithHistory(blocks.filter',
    content
)
content = re.sub(
    r'    setBlocks\(\[\.\.\.blocks, \.\.\.processedBlocks\]\);',
    r'    updateBlocksWithHistory([...blocks, ...processedBlocks]);',
    content
)

# 4. Add Undo/Redo buttons to the header
header_buttons = """          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#1F2937] rounded-xl border border-slate-700 overflow-hidden mr-2">
              <button
                onClick={handleUndo}
                disabled={past.length === 0}
                title="Undo"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <div className="w-px h-5 bg-slate-700"></div>
              <button
                onClick={handleRedo}
                disabled={future.length === 0}
                title="Redo"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>"""

content = re.sub(
    r'          <div className="flex items-center gap-3">',
    header_buttons,
    content
)

with open('src/admin/pages/VisualPageBuilder.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patched successfully')
