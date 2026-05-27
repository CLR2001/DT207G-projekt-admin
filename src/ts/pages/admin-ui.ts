const template = document.createElement('template');
template.innerHTML = `
<section class="main-content admin-main">
  <aside>
    <nav class="nav-list">
      <ul>
        <li><button type="button" class="active-button" id="start">Start</button></li>
        <li><button type="button" id="add-dish">Lägg till rätt</button></li>
        <li><button type="button" id="edit-dish">Redigera rätter</button></li>
        <li><button type="button" id="register">Registrera användare</button></li>
        <li><button type="button" id="edit-user">Hantera användare</button></li>
        <li><button type="button" class="log-out-button">Logga ut</button></li>
      </ul>
    </nav>
  </aside>
  <section class="admin-content">
    
  </section>
</section>
`;
export const adminUI = template;