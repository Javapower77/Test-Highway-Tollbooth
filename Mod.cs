using Colossal.IO.AssetDatabase;
using Colossal.Logging;
using Colossal.UI;
using Game;
using Game.Input;
using Game.Modding;
using Game.Prefabs;
using Game.Prefabs.Modes;
using Game.SceneFlow;
using Game.UI.InGame;
using System;
using System.IO;
using System.Reflection;
using Systems;
using Test_Highway_Tollbooth.Systems;
using Test_Highway_Tollbooth.Utilities;
using static Test_Highway_Tollbooth.ModSettings;

namespace Test_Highway_Tollbooth
{
    public class Mod : IMod
    {
        
        public const string MOD_NAME = "Test_Highway_Tollbooth";
        public static string uiHostName = "javapower-test-toll-highways";
        public static readonly string Id = "Test_Highway_Tollbooth";
        public static string Author = "Javapower";
        public static string Version => Assembly.GetExecutingAssembly().GetName().Version.ToString(4);
        public static string InformationalVersion => Assembly.GetExecutingAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>().InformationalVersion;
        internal static ModSettings Settings { get; private set; }

        public string ModPath { get; set; }
        public void OnLoad(UpdateSystem updateSystem)
        {
            // Log entry for debugging purposes
            LogUtil.Info($"{nameof(Mod)}.{nameof(OnLoad)}, version:{InformationalVersion}");

            try
            {
                // Register Key Binding and Settings UI
                LogUtil.Info("Registring Settings options in UI and keybindings");
                Settings = new ModSettings(this);
                Settings.RegisterKeyBindings();
                Settings.RegisterInOptionsUI();

                // Load all dictonary in English to apply in the objects of the mod
                GameManager.instance.localizationManager.AddSource("en-US", new LocaleEN(Settings));

                // Load the settings for the current mod
                AssetDatabase.global.LoadSettings(nameof(Test_Highway_Tollbooth), Settings, new ModSettings(this));

                Settings.ApplyAndSave();

                // Try to fetch the mod asset from the mod manager
                if (GameManager.instance.modManager.TryGetExecutableAsset(this, out var asset))
                {
                    ModPath = Path.GetDirectoryName(asset.path);
                    // Set the thumbnails location for the assets inside the mod
                    UIManager.defaultUISystem.AddHostLocation(uiHostName, Path.Combine(Path.GetDirectoryName(asset.path), "thumbs"), false);
                    LogUtil.Info($"Current mod asset at {asset.path}");
                    LogUtil.Info($"Current mod asset at {Path.GetDirectoryName(asset.path)}");
                    LogUtil.Info($"Current mod asset at {Path.Combine(Path.GetDirectoryName(asset.path), "thumbs")}");
                    LogUtil.Info($"Current mod asset at {uiHostName}");
                }
                else
                {
                    LogUtil.Error("Unable to get mod executable asset.");
                    return;
                }


                
                
                // Register other systems
                updateSystem.UpdateAt<TollBoothSpawnSystem>(SystemUpdatePhase.GameSimulation);
                updateSystem.UpdateAfter<TollRoadPrefabUpdateSystem>(SystemUpdatePhase.PrefabUpdate);
                updateSystem.UpdateAt<TollboothSelectionSystem>(SystemUpdatePhase.GameSimulation);
                updateSystem.UpdateAt<ToolboothInfoUISystem>(SystemUpdatePhase.UIUpdate);
                updateSystem.UpdateAt<MousePositionUISystem>(SystemUpdatePhase.UIUpdate);
                updateSystem.UpdateAt<TollBoothTooltipUISystem>(SystemUpdatePhase.UITooltip);


            }
            catch (Exception ex)
            {
                LogUtil.Exception(ex);
            }
        }

        public void OnDispose()
        {
            UIManager.defaultUISystem.RemoveHostLocation(uiHostName);
            UIManager.defaultUISystem.RemoveHostLocation("netsubobject-info");
            UIManager.defaultUISystem.RemoveHostLocation("mouse-position");
            LogUtil.Info($"{nameof(Mod)}.{nameof(OnDispose)}");
            Settings?.UnregisterInOptionsUI();
            Settings = null;
        }
    }
}
