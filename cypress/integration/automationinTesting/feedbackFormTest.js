context('Проверка формы обратной связи', function () {

    before(function () {
        cy.visit('/')
    })

    function hexToRgb(hex) {
      const rValue = parseInt(hex.substring(1, 3), 16);
      const gValue = parseInt(hex.substring(3, 5), 16);
      const bValue = parseInt(hex.substring(5), 16);
      return `rgb(${rValue}, ${gValue}, ${bValue})`;
    }

    it('Проверка отображения ошибки при пустом поле сообщения', () => {

        // Заполнение полей формы
        cy.get('[data-testid="ContactName"]').type('Иван Иванов')
        cy.get('[data-testid="ContactEmail"]').type('ivan_2000@mail.ru')
        cy.get('[data-testid="ContactPhone"]').type('+7(123)4567890')
        cy.get('[data-testid="ContactSubject"]').type('Бронирование')

        // Нажатие на кнопку отправки формы обратной связи
        cy.get('#submitContact').should('be.exist')
        cy.get('#submitContact').click()

        // Проверка отображения сообщения об ошибке
        cy.get('.alert').should('be.exist')
        cy.get('.alert').should('contain', 'Message may not be blank')
            .and('have.css', 'background-color', hexToRgb('#f8d7da'))
    })

})