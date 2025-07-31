using Colossal.Serialization.Entities;
using Unity.Collections;
using Unity.Entities;

namespace Domain.Components
{
    // This component is used to mark a prefab as a toll road.
    // And also to serialize it when the game is saved.
    public struct TollBoothPrefabData : IComponentData, ISerializable
    {
        public FixedString64Bytes name;
        public void Deserialize<TReader>(TReader reader) where TReader : IReader
        {
            reader.Read(out string name);
            this.name = new FixedString64Bytes(name);
        }

        public void Serialize<TWriter>(TWriter writer) where TWriter : IWriter
        {
            writer.Write(name.ToString());
        }
    }

}