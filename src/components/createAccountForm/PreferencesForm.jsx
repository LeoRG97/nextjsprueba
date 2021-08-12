import React from 'react';
import Script from 'next/script';

import styles from './createAccountForm.module.css';

const PreferencesForm = () => {
  return (
    <div className={styles.container}>
      <div>
        <h1 className="title mb-3">
          ¡Ya casi está listo!
        </h1>
        <span className="text-sm d-block mb-5">
          Antes de continuar, es necesario que elijas al menos tres categorías de tu preferencia,
          de esta manera, podremos mostrarte contenido que sea relevante para ti.
          Recuerda que siempre podrás modificarlas o añadir más ingresando a la opción
          Editar perfil.
        </span>
        <form className="mt-3">
          <span className="d-block subtitle mb-2">Me interesa el contenido relacionado con</span>
          <select id="preferences" defaultValue={['e']} multiple data-placeholder="+3 categorías">
            <option value="a">Tecnología</option>
            <option value="b">Innovación</option>
            <option value="c">Negocios</option>
            <option value="d">Finanzas</option>
            <option value="e">Sutentabilidad</option>
          </select>
        </form>
        <div className={styles.buttonContinue}>
          <button className="button button--theme-primary">
            Finalizar
          </button>
        </div>
      </div>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            $(document).ready(function() {

              var select = $('select[multiple]');
              var options = select.find('option');

              var div = $('<div />').addClass('selectMultiple');
              var active = $('<div />');
              var list = $('<ul />');
              var placeholder = select.data('placeholder');

              var span = $('<span />').text(placeholder).appendTo(active);

              options.each(function() {
                  var text = $(this).text();
                  if($(this).is(':selected')) {
                      active.append($('<a />').html('<em>' + text + '</em><i></i>'));
                      span.addClass('hide');
                  } else {
                      list.append($('<li />').html(text));
                  }
              });

              active.append($('<div />').addClass('arrow'));
              div.append(active).append(list);

              select.wrap(div);

              $(document).on('click', '.selectMultiple ul li', function(e) {
                  var select = $(this).parent().parent();
                  var li = $(this);
                  if(!select.hasClass('clicked')) {
                      select.addClass('clicked');
                      li.prev().addClass('beforeRemove');
                      li.next().addClass('afterRemove');
                      li.addClass('remove');
                      var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
                      a.slideDown(400, function() {
                          setTimeout(function() {
                              a.addClass('shown');
                              select.children('div').children('span').addClass('hide');
                              select.find('option:contains(' + li.text() + ')').prop('selected', true);
                          }, 500);
                      });
                      setTimeout(function() {
                          if(li.prev().is(':last-child')) {
                              li.prev().removeClass('beforeRemove');
                          }
                          if(li.next().is(':first-child')) {
                              li.next().removeClass('afterRemove');
                          }
                          setTimeout(function() {
                              li.prev().removeClass('beforeRemove');
                              li.next().removeClass('afterRemove');
                          }, 200);

                          li.slideUp(400, function() {
                              li.remove();
                              select.removeClass('clicked');
                          });
                      }, 600);
                  }
              });

              $(document).on('click', '.selectMultiple > div a', function(e) {
                  var select = $(this).parent().parent();
                  var self = $(this);
                  self.removeClass().addClass('remove');
                  select.addClass('open');
                  setTimeout(function() {
                      self.addClass('disappear');
                      setTimeout(function() {
                          self.animate({
                              width: 0,
                              height: 0,
                              padding: 0,
                              margin: 0
                          }, 300, function() {
                              var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                              li.slideDown(400, function() {
                                  li.addClass('show');
                                  setTimeout(function() {
                                      select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                                      if(!select.find('option:selected').length) {
                                          select.children('div').children('span').removeClass('hide');
                                      }
                                      li.removeClass();
                                  }, 400);
                              });
                              self.remove();
                          })
                      }, 300);
                  }, 400);
              });

              $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function(e) {
                  $(this).parent().parent().toggleClass('open');
              });

          });
              `,
        }}
      />
    </div>
  );
};

export default PreferencesForm;
