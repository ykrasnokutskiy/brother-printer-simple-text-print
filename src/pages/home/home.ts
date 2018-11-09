import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import lodash from 'lodash';

declare var cordova: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public platform: Platform;

  constructor(
    public navCtrl: NavController,
    platform: Platform
  ) {
    this.platform = platform;
  }

  printer() {

    if (this.platform.is('core')) {
      console.log(`WINDOWS`);
    }

    if (this.platform.is('android')) {
      console.log(`Printer class:`);
      console.log(cordova.plugins);

      cordova.plugins.brotherPrinter.findBluetoothPrinters((printers) => {
        if (printers.length > 0) {
          console.log(`found bluetooth printers:`);
          console.log(printers);

          let brother = lodash.find(printers, {model: 'QL_820NWB'});
          if (brother) {
            console.log('found brother printer:');
            console.log(brother);

            // set printer
            cordova.plugins.brotherPrinter.setPrinter(brother,
              connectedPrinter => {
                console.log(`connected to brother printer:`);
                console.log(connectedPrinter);

                // get printer's status
                cordova.plugins.brotherPrinter.printerStatus(status => {
                  console.log(`printer status:`);
                  console.log(status);
                })

              },
              error => {
                console.log(`error`);
                console.log(error);
              }
            )
          } else {
            // no correct printer found
            console.log(`can't find correct printer`);
          }
        } else {
          // no printer found
          console.log(`no printers were found`);
        }
      }, (err) => {
        console.log(`Error`);
        console.log(err)
      });
    }

  }

}
