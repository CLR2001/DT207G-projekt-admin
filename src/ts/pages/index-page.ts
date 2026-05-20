const template = document.createElement('template');
template.innerHTML = `
<section class="main-content index-main">
  <section class="main-section">
    <div class="log-in-form">
      <div class="log-in-form-header">
        <h1>Logga in</h1>
      </div>
      <form class="log-in-form-content">
        <div>
          <label for="username" id="username-label">Användarnamn eller e-post</label>
          <input type="text" name="username" id="username">
        </div>
        <div>
          <label for="password">Lösenord</label>
          <input type="password" name="password" id="password" autocomplete="off">
        </div>
        <div class="buttons-container">
          <button class="log-in-button">Logga in</button>
          <button class="clear-button">Rensa</button>
        </div>
        <ul class="message-list"></ul>
      </form>
    </div>
  </section>
</section>
`;
export const pageTemplate = template;