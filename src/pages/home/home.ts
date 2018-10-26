import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import lodash from 'lodash';

declare var cordova: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController
  ) {}

  printer() {
    console.log(`Printer class:`);
    console.log(cordova.plugins.brotherPrinter);

    cordova.plugins.brotherPrinter.findBluetoothPrinters((printers)=>{
      if (printers.length > 0) {
        console.log('found bluetooth printers:');
        console.log(printers);

        let brother = lodash.find(printers, {model: 'QL_820NWB'});
        if (brother) {
          console.log('found brother printer');

          // set printer

          cordova.plugins.brotherPrinter.setPrinter(brother, () => {
            console.log('connected to brother printer');

            // ToDo: Here should be code to send text to printer
            // ToDo: Also, how to check any printer status? If it's switched on, has paper roll, etc.




          }, (error) => {
            console.log('error');
            console.log(error);
          } );

        } else {
          // no correct printer found
          console.log(`can't find correct printer`);
        }
      } else {
        // no printer found
        console.log(`no printers were found`);
      }
    },(err)=>{
      console.log("Error");
      console.log(err)
    });

  }

}
