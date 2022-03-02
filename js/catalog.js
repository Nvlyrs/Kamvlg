"use strict"

let catigories = function (target) {
    var _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
      _eventTabsShow,
      _showTab = function (tabsLinkTarget) {
        let tabsPaneTarget, tabsLinkActive, tabsPaneShow;
        tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('data-href'));
        tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.coaches-section__list-item_active');
        tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.coaches-section__body_active');

        if (tabsLinkTarget === tabsLinkActive) {
          return;
        }

        if (tabsLinkActive !== null) {
          tabsLinkActive.classList.remove('coaches-section__list-item_active');
        }

        if (tabsPaneShow !== null) {
          tabsPaneShow.classList.remove('coaches-section__body_active');
        }

        tabsLinkTarget.classList.add('coaches-section__list-item_active');
        tabsPaneTarget.classList.add('coaches-section__body_active');
        document.dispatchEvent(_eventTabsShow);
      },
      _switchTabTo = function (tabsLinkIndex) {
        var tabsLinks = _elemTabs.querySelectorAll('.coaches-section__list-item');
        if (tabsLinks.length > 0) {
          if (tabsLinkIndex > tabsLinks.length) {
            tabsLinkIndex = tabsLinks.length;
          } else if (tabsLinkIndex < 1) {
            tabsLinkIndex = 1;
          }
          _showTab(tabsLinks[tabsLinkIndex - 1]);
        }
      };
    
    _eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });
    
    _elemTabs.addEventListener('click', function (e) {
      var tabsLinkTarget = e.target;
      if (!tabsLinkTarget.classList.contains('coaches-section__list-item')) {
        return;
      }
      e.preventDefault();
      _showTab(tabsLinkTarget);
    });
    
    return {
      showTab: function (target) {
        _showTab(target);
      },
      switchTabTo: function (index) {
        _switchTabTo(index);
      }
    }
    
    };
    
    catigories('.coaches-section__list');