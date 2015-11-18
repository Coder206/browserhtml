/* @flow */

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import {html} from 'reflex';
import {Style, StyleSheet} from '../common/style';

// Read a tab title from a page model.
// @TODO localize this string
const readTitle = (page) =>
  page.title && page.title !== '' ? page.title : page.uri;

const style = StyleSheet.create({
  sidebar: {
    // WARNING: will slow down animations! (gecko)
    xBoxShadow: 'rgba(0, 0, 0, 0.5) -80px 0 100px',
    backgroundColor: '#2E3D4D',
    height: '100vh',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '380px',
  },

  sidebarHidden: {
    transform: 'translateX(380px)',
  },

  tab: {
    borderRadius: '5px',
    padding: '0 15px',
    lineHeight: '35px',
    color: '#fff',
    fontSize: '14px',
    margin: '0 35px',
    padding: '0 33px',
    position: 'relative'
  },

  tabHover: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  title: {
    display: 'inline'
  },

  favicon: {
    backgroundColor: 'white',
    backgroundSize: 'cover',
    borderRadius: '3px',
    left: '9px',
    position: 'absolute',
    top: '8px',
    width: '16px',
    height: '16px',
  }
});

const viewTab = ({page}, address) =>
  html.div({
    className: 'sidebar-tab',
    style: Style(style.tab)
  }, [
    html.div({
      src: page.faviconURI,
      style: Style(style.favicon, {
        backgroundImage: `url(page.faviconURI)`
      })
    }),
    html.div({
      className: 'sidebar-tab-title',
      style: Style(style.title)
    }, [readTitle(page)])
  ]);

export const view = ({entries}, address) =>
  html.div({
    className: 'sidebar',
    style: Style(style.sidebar),
  }, [
    html.div({
      className: 'sidebar-tabs-scrollbox'
    }, entries.map(entry => viewTab(entry, address))),
    html.div({
      className: 'sidebar-toolbar'
    })
  ]);