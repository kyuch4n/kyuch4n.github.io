// @ts-nocheck
import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    // MOBILE COMPATIBILITY
    !(function(a) {
      function f(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
          a.preventDefault();
          var c = a.originalEvent.changedTouches[0],
            d = document.createEvent('MouseEvents');
          d.initMouseEvent(
            b,
            !0,
            !0,
            window,
            1,
            c.screenX,
            c.screenY,
            c.clientX,
            c.clientY,
            !1,
            !1,
            !1,
            !1,
            0,
            null,
          ),
            a.target.dispatchEvent(d);
        }
      }
      if (((a.support.touch = 'ontouchend' in document), a.support.touch)) {
        var e,
          b = a.ui.mouse.prototype,
          c = b._mouseInit,
          d = b._mouseDestroy;
        (b._touchStart = function(a) {
          var b = this;
          !e &&
            b._mouseCapture(a.originalEvent.changedTouches[0]) &&
            ((e = !0),
            (b._touchMoved = !1),
            f(a, 'mouseover'),
            f(a, 'mousemove'),
            f(a, 'mousedown'));
        }),
          (b._touchMove = function(a) {
            e && ((this._touchMoved = !0), f(a, 'mousemove'));
          }),
          (b._touchEnd = function(a) {
            e &&
              (f(a, 'mouseup'),
              f(a, 'mouseout'),
              this._touchMoved || f(a, 'click'),
              (e = !1));
          }),
          (b._mouseInit = function() {
            var b = this;
            b.element.bind({
              touchstart: a.proxy(b, '_touchStart'),
              touchmove: a.proxy(b, '_touchMove'),
              touchend: a.proxy(b, '_touchEnd'),
            }),
              c.call(b);
          }),
          (b._mouseDestroy = function() {
            var b = this;
            b.element.unbind({
              touchstart: a.proxy(b, '_touchStart'),
              touchmove: a.proxy(b, '_touchMove'),
              touchend: a.proxy(b, '_touchEnd'),
            }),
              d.call(b);
          });
      }
    })(jQuery);

    // UNLOCK THE WORLD
    (function($) {
      $.fn.unlck = function(callback) {
        var _this = this;
        $('.drag', this).on('mousedown', function() {
          $(this).addClass('actived');
          $(this)
            .siblings('li')
            .stop()
            .animate({
              opacity: 1,
            });
          _this.addClass('actived');
        });

        $('.drag', this).on('mouseup', function() {
          $(this).removeClass('actived');
          $(this)
            .siblings('li')
            .stop()
            .animate({
              opacity: 0,
            });
          _this.removeClass('actived');
        });

        $('.drag', this)
          .draggable({
            revert: true,
            cursorAt: {
              top: 30,
              left: 30,
            },
          })
          .siblings('li')
          .droppable({
            hoverClass: 'hovered',
            tolerance: 'pointer',
            drop: function(event, ui) {
              callback.call(this, event, ui);
            },
            over: function(event, ui) {
              $(this)
                .css({
                  opacity: 1,
                })
                .siblings('li')
                .not('drag')
                .stop()
                .animate(
                  {
                    opacity: '.3',
                  },
                  200,
                );
            },
            out: function(event, ui) {
              $(this)
                .siblings('li')
                .not('drag')
                .stop()
                .animate(
                  {
                    opacity: 1,
                  },
                  200,
                );
            },
          });
      };
    })(jQuery);

    // FIRES THE LOCKSCREEN WITH HIS CUSTOM CALLBACK
    $('.unlck').unlck(function(event, ui) {
      var target = $(event.target),
        href = $('a', target).attr('href');

      $(ui.draggable)
        .appendTo(target)
        .remove();

      $('a', target).addClass('actived');

      if (/^#/.test(href)) {
        $(href).slideDown(200);
      } else {
        window.location.href = href;
      }
    });
  }, []);
};
