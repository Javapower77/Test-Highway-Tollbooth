using Domain.Components;
using Game;
using Game.Common;
using Game.Objects;
using Game.Prefabs;
using System;
using System.Collections.Generic;
using Unity.Collections;
using Unity.Entities;
using Test_Highway_Tollbooth.Utilities;

namespace Test_Highway_Tollbooth.Systems
{
    public partial class TollBoothSpawnSystem : GameSystemBase
    {
        private EntityQuery m_TollBoothQuery;
        private PrefabSystem m_PrefabSystem;
        private HashSet<Entity> m_ProcessedEntities;

        // Predefined random names for toll booths
        private readonly string[] m_TollBoothNames = new string[]
        {
            "Gateway Plaza",
            "Golden Bridge Toll",
            "Sunrise Station",
            "Mountain View Plaza",
            "Riverside Checkpoint",
            "Valley Express",
            "Harbor Gate",
            "Summit Pass",
            "Metro Junction",
            "Central Plaza",
            "Pine Ridge Station",
            "Coastal Gateway",
            "Highland Passage",
            "Urban Express",
            "Parkway Plaza",
            "Commerce Gate",
            "Industrial Junction",
            "Liberty Station",
            "Eagle Pass",
            "Thunder Ridge",
            "Crystal Bay Plaza",
            "Meadowbrook Gate",
            "Silverstone Pass",
            "Woodland Station",
            "Lakeside Plaza"
        };

        private Random m_Random;

        // Add this event to notify when toll booth data changes
        public static event System.Action<Entity, string> TollBoothDataChanged;

        protected override void OnCreate()
        {
            base.OnCreate();

            m_PrefabSystem = World.GetOrCreateSystemManaged<PrefabSystem>();
            m_Random = new Random((int)DateTime.Now.Ticks);
            m_ProcessedEntities = new HashSet<Entity>();

            // Query for all toll booth entities
            m_TollBoothQuery = GetEntityQuery(
                ComponentType.ReadWrite<TollBoothPrefabData>(),
                ComponentType.ReadOnly<PrefabRef>()
            );

            LogUtil.Info("TollBoothSpawnSystem: System created and initialized");
        }

        protected override void OnUpdate()
        {
            // Add debug logging to see if the system is running
            //LogUtil.Info($"TollBoothSpawnSystem: OnUpdate called, found {m_TollBoothQuery.CalculateEntityCount()} toll booth entities");

            var entities = m_TollBoothQuery.ToEntityArray(Allocator.TempJob);
            var tollBoothDataArray = m_TollBoothQuery.ToComponentDataArray<TollBoothPrefabData>(Allocator.TempJob);

            try
            {
                for (int i = 0; i < entities.Length; i++)
                {
                    var entity = entities[i];
                    var tollBoothData = tollBoothDataArray[i];

                    // Skip if we've already processed this entity
                    if (m_ProcessedEntities.Contains(entity))
                        continue;

                    LogUtil.Info($"TollBoothSpawnSystem: Processing entity {entity.Index}, current name: '{tollBoothData.name}'");

                    // Check if the name is empty or default
                    if (string.IsNullOrEmpty(tollBoothData.name.ToString()) || 
                        tollBoothData.name.ToString() == "TollBooth" ||
                        tollBoothData.name.ToString() == "")
                    {
                        // Generate a unique random name
                        AssignRandomName(entity, tollBoothData);
                    }
                    else
                    {
                        // Entity already has a name, mark as processed
                        m_ProcessedEntities.Add(entity);
                        LogUtil.Info($"TollBoothSpawnSystem: Entity {entity.Index} already has name '{tollBoothData.name}', skipping");
                    }
                }
            }
            finally
            {
                entities.Dispose();
                tollBoothDataArray.Dispose();
            }

            // Clean up processed entities that no longer exist (optional, for memory management)
            CleanupProcessedEntities();
        }

        private void CleanupProcessedEntities()
        {
            // Remove entities from processed list if they no longer exist
            var toRemove = new List<Entity>();
            foreach (var entity in m_ProcessedEntities)
            {
                if (!EntityManager.Exists(entity))
                {
                    toRemove.Add(entity);
                }
            }

            foreach (var entity in toRemove)
            {
                m_ProcessedEntities.Remove(entity);
            }
        }

        private string GenerateRandomTollBoothName()
        {
            // Choose a random base name
            string baseName = m_TollBoothNames[m_Random.Next(m_TollBoothNames.Length)];
            
            // Add a random number to make it more unique
            int randomNumber = m_Random.Next(1, 100);
            
            // Combine base name with number or use just the base name occasionally
            if (m_Random.Next(100) < 30) // 30% chance to add number
            {
                return $"{baseName} {randomNumber}";
            }
            else
            {
                return baseName;
            }
        }

        // Alternative method using more varied naming patterns
        private string GenerateRandomTollBoothNameAdvanced()
        {
            string[] prefixes = { "North", "South", "East", "West", "Central", "Upper", "Lower", "New", "Old" };
            string[] types = { "Plaza", "Station", "Gate", "Checkpoint", "Pass", "Junction", "Express", "Bridge" };
            string[] suffixes = { "A", "B", "C", "1", "2", "3", "Main", "Ext" };

            string baseName = m_TollBoothNames[m_Random.Next(m_TollBoothNames.Length)];
            
            // 40% chance to add prefix
            if (m_Random.Next(100) < 40)
            {
                string prefix = prefixes[m_Random.Next(prefixes.Length)];
                baseName = $"{prefix} {baseName}";
            }

            // 20% chance to add suffix
            if (m_Random.Next(100) < 20)
            {
                string suffix = suffixes[m_Random.Next(suffixes.Length)];
                baseName = $"{baseName}-{suffix}";
            }

            return baseName;
        }

        // Modify the existing method where names are assigned
        private void AssignRandomName(Entity entity, TollBoothPrefabData tollBoothData)
        {
            string randomName = GenerateRandomTollBoothName();
            tollBoothData.name = new Unity.Collections.FixedString64Bytes(randomName);

            // Update the component on the entity
            EntityManager.SetComponentData(entity, tollBoothData);

            // Mark this entity as processed
            m_ProcessedEntities.Add(entity);

            // Notify systems about the name change
            TollBoothDataChanged?.Invoke(entity, randomName);

            LogUtil.Info($"TollBoothSpawnSystem: Assigned random name '{randomName}' to toll booth entity {entity.Index}");
        }

        protected override void OnDestroy()
        {
            m_ProcessedEntities?.Clear();
            base.OnDestroy();
        }
    }
}