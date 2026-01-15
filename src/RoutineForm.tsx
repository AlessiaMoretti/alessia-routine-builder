export default function RoutineForm() {
  return (
    <div style={{ border: "2px solid green", padding: 16, marginTop: 16 }}>
      <h2>Routine Form</h2>

      <label>
        Тип рутина:
        <select>
          <option>Сутрешна</option>
          <option>Вечерна</option>
        </select>
      </label>

      <br /><br />

      <button>Генерирай рутина</button>
    </div>
  );
}

