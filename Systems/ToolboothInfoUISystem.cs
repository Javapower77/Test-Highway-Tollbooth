using Colossal.Entities;
using Colossal.UI.Binding;
using Domain.Components;
using Game.Tools;
using Game.UI;
using Test_Highway_Tollbooth.Utilities;
using Unity.Entities;

namespace Test_Highway_Tollbooth.Systems
{
    public partial class ToolboothInfoUISystem : UISystemBase
    {
        private ToolSystem m_ToolSystem;
        private ValueBinding<bool> m_IsPanelVisible;
        private ValueBinding<string> m_PanelTitle;
        private ValueBinding<string> m_TollAmount;
        private ValueBinding<string> m_TotalIncome;

        protected override void OnCreate()
        {
            base.OnCreate();
            m_ToolSystem = World.GetOrCreateSystemManaged<ToolSystem>();

            m_IsPanelVisible = new ValueBinding<bool>("tollboothInfo", "isPanelVisible", false);
            m_PanelTitle = new ValueBinding<string>("tollboothInfo", "panelTitle", "Toll Booth");
            m_TollAmount = new ValueBinding<string>("tollboothInfo", "tollAmount", "0");
            m_TotalIncome = new ValueBinding<string>("tollboothInfo", "totalIncome", "0");

            AddBinding(m_IsPanelVisible);
            AddBinding(m_PanelTitle);
            AddBinding(m_TollAmount);
            AddBinding(m_TotalIncome);
            
            // Simple close handler that just clears the panel visibility
            AddBinding(new TriggerBinding("tollboothInfo", "onClose", () =>
            {
                LogUtil.Info("ToolboothInfoUISystem: Panel closed by user");
                m_IsPanelVisible.Update(false);
            }));

            LogUtil.Info("ToolboothInfoUISystem created and bindings initialized.");
        }

        protected override void OnUpdate()
        {
            Entity selectedEntity = m_ToolSystem.selected;

            if (selectedEntity != Entity.Null && EntityManager.HasComponent<TollBoothPrefabData>(selectedEntity))
            {
                if (!m_IsPanelVisible.value)
                {
                    LogUtil.Info("ToolboothInfoUISystem: Showing tollbooth panel");
                    m_IsPanelVisible.Update(true);
                }
                UpdatePanelData(selectedEntity);
            }
            else
            {
                if (m_IsPanelVisible.value)
                {
                    LogUtil.Info("ToolboothInfoUISystem: Hiding tollbooth panel");
                    m_IsPanelVisible.Update(false);
                }
            }
        }

        private void UpdatePanelData(Entity entity)
        {
            if (entity == Entity.Null || !EntityManager.Exists(entity))
                return;

            if (EntityManager.TryGetComponent<TollBoothPrefabData>(entity, out var data))
            {
                m_PanelTitle.Update(data.name.ToString());
                m_TollAmount.Update("$234.00");
                m_TotalIncome.Update("$1,234.56");
            }
        }
    }
}