using Colossal.Entities;
using Colossal.UI.Binding;
using Domain.Components;
using Game.Tools;
using Game.UI;
using Test_Highway_Tollbooth.Extensions;
using Test_Highway_Tollbooth.Utilities;
using Unity.Entities;

namespace Test_Highway_Tollbooth.Systems
{
    public partial class TollBoothInfoUISystem : ExtendedInfoSectionBase
    {
        private ToolSystem m_ToolSystem;
        private ValueBindingHelper<bool> m_IsPanelVisible;
        private ValueBindingHelper<string> m_PanelTitle;
        private ValueBindingHelper<string> m_TollAmount;
        private ValueBindingHelper<string> m_TotalIncome;
        private ValueBindingHelper<string> m_PanelIcon;
        protected override string group => Mod.Id;

        /// <inheritdoc/>
        public override void OnWriteProperties(IJsonWriter writer)
        {
        }

        /// <inheritdoc/>
        protected override void OnProcess()
        {
        }

        /// <inheritdoc/>
        protected override void Reset()
        {
        }


        protected override void OnCreate()
        {
            base.OnCreate();
            m_ToolSystem = World.GetOrCreateSystemManaged<ToolSystem>();
            m_InfoUISystem.AddMiddleSection(this);

            m_IsPanelVisible = CreateBinding("isPanelVisible", false);
            m_PanelTitle = CreateBinding("panelTitle", "Toll Booth");
            m_TollAmount = CreateBinding("tollAmount", "0");
            m_TotalIncome = CreateBinding("totalIncome", "0");
            m_PanelIcon = CreateBinding("panelIcon", "");

            LogUtil.Info("ToolboothInfoUISystem created and bindings initialized.");
        }

        protected override void OnUpdate()
        {
            Entity selectedEntity = m_ToolSystem.selected;

            if (selectedEntity != Entity.Null && EntityManager.HasComponent<TollBoothPrefabData>(selectedEntity))
            {
                if (!m_IsPanelVisible.Value)
                {
                    LogUtil.Info("ToolboothInfoUISystem: Showing tollbooth panel");
                    m_IsPanelVisible.Value = true;
                }
                UpdatePanelData(selectedEntity);
            }
            else
            {
                if (m_IsPanelVisible.Value)
                {
                    LogUtil.Info("ToolboothInfoUISystem: Hiding tollbooth panel");
                    m_IsPanelVisible.Value = false;
                }
            }

            base.visible = true;
        }

        private void UpdatePanelData(Entity entity)
        {
            if (entity == Entity.Null || !EntityManager.Exists(entity))
                return;

            if (EntityManager.TryGetComponent<TollBoothPrefabData>(entity, out var data))
            {
                m_PanelTitle.Value = data.name.ToString();
                m_TollAmount.Value = "$234.00";
                m_TotalIncome.Value = "$1,234.56";
            }
        }
    }
}