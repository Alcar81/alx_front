// 📁 Builder/panels/floatingBuilderPanel/TabGeneral.tsx

import React from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTemplateStore } from "../../store/templateStore";

interface Props {
  setIsDirty: (v: boolean) => void;
}

const TabGeneral: React.FC<Props> = ({ setIsDirty }) => {
  const {
    templates,
    selectedTemplate,
    setSelectedTemplate,
    addTemplate,
    removeTemplate,
    incrementVersion,
  } = useTemplateStore();

  const handleCreateLayout = () => {
    const name = prompt("Nom du nouveau template ?");
    if (!name) return;
    addTemplate(name);
    setIsDirty(true);
  };

  const handleDeleteLayout = () => {
    if (!selectedTemplate) return;
    if (!window.confirm(`Supprimer le template "${selectedTemplate}" ?`)) return;
    removeTemplate(selectedTemplate);
    setIsDirty(true);
  };

  const handleIncrementVersion = () => {
    incrementVersion(selectedTemplate);
    setIsDirty(true);
  };

  return (
    <>
      <div className="row-input">
        <label htmlFor="layout-select">Nom :</label>
        <select
          id="layout-select"
          className="layout-dropdown"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          {templates.map((layout) => (
            <option key={layout.name} value={layout.name}>
              {layout.name}
            </option>
          ))}
        </select>
      </div>

      <div className="layout-action-buttons right">
        <IconButton className="icon-create" onClick={handleCreateLayout}>
          <AddIcon />
        </IconButton>
        <IconButton
          className={`icon-delete ${selectedTemplate === "Portfolio-2024" ? "disabled" : ""}`}
          onClick={handleDeleteLayout}
          disabled={selectedTemplate === "Portfolio-2024"}
        >
          <DeleteOutlineIcon />
        </IconButton>
      </div>

      <div className="row-input">
        <label>Créé le :</label>
        <span>{templates.find(t => t.name === selectedTemplate)?.createdAt || "-"}</span>
      </div>

      <div className="row-input">
        <label>Version :</label>
        <span>v.{templates.find(t => t.name === selectedTemplate)?.version || 1}</span>
        <button className="zone-reset-button" onClick={handleIncrementVersion}>📈 +1</button>
      </div>

      <div className="layout-actions">
        <button onClick={() => alert("📤 Export à venir")}>📤 Exporter</button>
        <button onClick={() => alert("📥 Import à venir")}>📥 Importer</button>
      </div>
    </>
  );
};

export default TabGeneral;
