<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reservation;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Productvariant;
use App\Models\Log;

class CheckOldReservations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservations:check-old';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Verifica as reservas com mais de 48h';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $limit = Carbon::now()->subHours(48);

        if($limit->isWeekend()){
            $limit = Carbon::now()->subHours(72);
        }

        $reservations = Reservation::where('created_at', '<=', $limit)->where('status', Reservation::PENDING)->get();

        $reservationsCounter = 0;

        foreach($reservations as $reservation){
            $reservation->status = Reservation::TIME_EXCEEDED;
            $reservationsCounter++;

            $productVariant = Productvariant::find($reservation->id_variant);
            $product = $productVariant->product;
            $old_product_quantity = $productVariant->quantity;
            $old_reserved_quantity = $productVariant->reserved;
            $product->quantity += $reservation->quantity;
            $product->reserved -= $reservation->quantity;
            $productVariant->quantity += $reservation->quantity;
            $productVariant->reserved -= $reservation->quantity;

            $product->save();
            $productVariant->save();
            $reservation->save();

            $log = new Log();
            $log->id_product = $reservation->id_product;
            if($productVariant->size){
                $log->message = "Reserva " . "tamanho: " . $productVariant->size .", " . "cor: ". $productVariant->color . ", expirada";
            }else{
                $log->message = "Reserva " . "cor: ". $productVariant->color . " expirada";
            }
            $log->addQuantity = $reservation->quantity;
            $log->removeReserved = $reservation->quantity;
            $log->oldQuantity = $old_product_quantity;
            $log->oldReserved = $old_reserved_quantity;
            $log->newQuantity = $productVariant->quantity;
            $log->newReserved = $productVariant->reserved;
            $log->save();
        }

        $this->info('Tempo limite das reservas verificado');
        if($reservationsCounter > 0){
            $this->info('Reservas com mais de 48h: ' . $reservationsCounter);
        } else {
            $this->info('Nenhuma reserva com mais de 48h');
        }
    }
}
