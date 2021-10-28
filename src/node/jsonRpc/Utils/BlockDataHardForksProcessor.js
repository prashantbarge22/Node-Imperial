import IDLLCoins from '../../../common/utils/coins/IDLL-Coins';

class BlockDataHardForksProcessor {
    static processBlockData(oBlockData, bIncludeTransactions = true) {
        switch (oBlockData.block_id) {
            case 153060:
                return this._wallet_recovery_fork_153060(oBlockData, bIncludeTransactions);
        }

        return oBlockData;
    }

    /**
     * @param  {String} sHash
     * @return null|int
     */
    static findBlockNumberForTransactionHash(sHash) {
        switch (sHash) {
            case 'virtual_tx_153060_1':
                return 153060;
        }

        return null;
    }

    static _wallet_recovery_fork_153060(oBlockData, bIncludeTransactions = true) {
        const HARD_FORK_INFO = {
            BLOCK_NUMBER: 153060,
            ADDRESS_BALANCE_REDUCTION: {
                'IDLL$gCI4g2ePRP6oyfVdqF1e4f36CSEnjMus0D$':-72493010000,
                'IDLL$gAL20HcccJv#7yb7FAW4PBLF$GuznBNppj$':-59500000000,
                'IDLL$gCs#kIRWjk6VK1me23wVbVhcvifxNRH@kr$':-50002410000,
                'IDLL$gAUA2qpu@fdF8mbYiK09CrPepZ2kF3us+T$':-3410370000,
                'IDLL$gCNa0reZgVBZ4Ao9$Fdxg7jJT7t9IzZdHr$':-30000000000,
                'IDLL$gD$XiN5r1uVU#QgZRhM@en8dR1xLB@BEtf$':-331776851311,
                'IDLL$gAoKHsE#ofUgDR5nBXzz$d2osXUkQKG8YT$':-30000000000,
                'IDLL$gDvsqIt28D+JGYDgH3a$zfKdtnSDIoBfMj$':-30000000000,
                'IDLL$gBf3aFQ3x60Sy7IjKW11PKRBsBU7g$BtTP$':-5150200000,
                'IDLL$gDUF#9udyMBunHuckI#qy18NQQ@GXCyGFv$':-24849400000,
                'IDLL$gCvEEh7t36zJ1HwcywEtPg3uB+hwqv#6nr$':-15000000000,
                'IDLL$gB+jFjcYkZvSmN$4MrbooUmPkiIgpWMupT$':-7679600000,
                'IDLL$gDpL+ZrWG@FZ@W44AH5b@XKNL6Nm@EtrWP$':-27509492,
                'IDLL$gDqHf#7XqVXb3A+SThuM9YJ0Vk7APs9Sh3$':-11234900000,
                'IDLL$gCGdPQLohdeHQqa+ptoJ@QK2LCvN7IS5JX$':-144304338450,
                'IDLL$gAizMSPYd8bbEnj#msFfKhyGYKtc4eZq$f$':-500514150000,
                'IDLL$gBgoD@HGUkzJYKaT+9P06YHi42P13A5C@3$':-499484250000,
                'IDLL$gCyRA$hcf69sIeWy@Vqqv6gZY@i7tFywcL$':-1000000100000,
                'IDLL$gBBUX#hpTTM707GHUhH$EEchYmKumNm3V7$':-10000400000,
                'IDLL$gD7zdUjrGsQCdTxfYYBetGDPo$3hPdRfoj$':-158771170000,
                'IDLL$gD6N6#@M@Tur+q7a4GdMq0AGikucD06+S$$':-106544640000,
                'IDLL$gD+BhYnHP6Hq638Q#ULMAVK6hcx+1894or$':-146495900000,
                'IDLL$gDU+tP3@42@L9$Is463vDJi4IKrabPNNn$$':-312439297,
                'IDLL$gBCkW6zQQSwo0AQ95RcLtGIi$egexiFNzn$':-69999600000,
                'IDLL$gBwfMzq00SvfSZtiYDgZBPZDX+ECV0IuTf$':-9999800000,
                'IDLL$gD6kjAok9mL$r9eLPv1$LCCq39yai9Hi0f$':-60000000000,
                'IDLL$gDzwF0ArIz2UrWfk0n64Byc2KeIYnf8z3j$':-33721550,
                'IDLL$gC3bRwhM8cciLCJnnPtr22Not0N4N4LSW3$':-241290700000,
                'IDLL$gAuVnxLUbZc#tJ2Gm+Lqh6Qqr#ZJxVgQ#j$':-10000500000,
                'IDLL$gDjtNXangkzYJxRLWhBPwSSDMC0ha$gbCz$':-7200100000,
                'IDLL$gBkeL04WBpUdFfi6AAm$334VxLaHiu3x8r$':-120100000,
                'IDLL$gCt0MQmg0TP0CEICyKqzJjoAjzLkg$66$P$':-22589470,
                'IDLL$gBPJmvI1GScq6sck2o6U0jbrFe#SroRRnf$':-280000000000,
                'IDLL$gA4W9tWX3qH+mof5SUmK1PMVRno+Y9Q$Yb$':-48022350000,
                'IDLL$gCjc#Pa42$iAe1V@L4rbtGt@0WnBU@+35L$':-319999200000,
                'IDLL$gBvPUu9cpq8nMNZZe1ojGfkA8DZT87hmHH$':-200000000000,
                'IDLL$gBxgu5KhUgMyq70MxPsIDLmKghPhXLvJUH$':-13108410000,
                'IDLL$gC@AgTovodqqyBTmvcKrLayGLXU36@hraz$':-299999900000,
                'IDLL$gC3ubgck#m5U3TF@iN@FMSeK7AErZTERXv$':-269999800000,
                'IDLL$gAPIcafjmpsZDwIxfnS+6Lbbt45Pr@+pQT$':-150000000000,
                'IDLL$gARIJGw3PQ5NUG1FAqR@2x6UCwwi4qf7zX$':-149999900000,
                'IDLL$gCnnEZZqzSWYon456tYj+dy2o7kXuYp9Dj$':-78262480000,
                'IDLL$gApdUUz8oZUD@hHx4i00cM1x@QWeJy@Y33$':-10001300000,
                'IDLL$gCrP1BQqV0Qo@IotsUT3$DHmJsnkfmuKPP$':-182883970000,
                'IDLL$gDR5uT2L5ZDt93FB3ACwx@YXZMVPJvvRQj$':-45917418000,
                'IDLL$gAXv5@Zhq@tH3wFfhNgebN0yx7UP7$epsr$':-150000000000,
                'IDLL$gDj1dBsAjAUHDSmWvy$YV5wkFxPCV#QLaD$':-8803389,
                'IDLL$gDwzvvfITevWUIdgZqwoZcMeoMKepvn#Nr$':-120177480000,
                'IDLL$gBmVBdnZSVUbKphi@Q8I59N7YxLKgcUCQP$':-94162149990,
                'IDLL$gAhEJu3dVrA7JwS2rxiqqmfTWNmIT+BxRf$':-28744170000,
                'IDLL$gBimi+smpTQIVTLb37284BxMxev3mV#XJz$':-222422596978,
                'IDLL$gBpM63KeuGKLPY3vNT0bDdd1#aw4NXi9cL$':-93344030062,
                'IDLL$gBEGMkhAPFoL1vcF+yK1G0+uH0eDInoawb$':-251819829938,
                'IDLL$gD0@3NaJrALd4tf4G9+ikfZh$TUdPPMxR3$':-103404900000,
                'IDLL$gA3PjoZPNRI5DryGqZpRxJyUzbtGI2NVv3$':-359998980000,
                'IDLL$gBS@h+LUHLA#APB8eJbC8a3yqEGZdq0mKT$':-21348210011,
                'IDLL$gBRJ8PIKr0hvxkFt3Tj2hL@BpfIR7NFtUP$':-207464570000,
                'IDLL$gBxLoPf3ybmpGx0t5meR+Z$R9M9rCGDe5T$':-137182353011,
                'IDLL$gBQSyf58N6#JhE8c@nIp9Qr+CGUv+FWp2L$':-144499160000,
                'IDLL$gCAqs7bwLf8ku0C8Q+xtpKY9GiBophnbx7$':-239123450000,
                'IDLL$gCX@b7opCEWMNYN+91E1CuM7m@vLY3usTb$':-349999700000,
                'IDLL$gD2u2PFecv#fm0wYtcAcb0YRem9QsEGq@$$':-28680208611,
                'IDLL$gAzygvuF2zrtu3NoqFkUUfswidob8YPuGn$':-150000200000,
                'IDLL$gDxFq+B+zb8$YMB8ivofB95VnecR$NeLLH$':-11201240000,
                'IDLL$gCaUzkhg7nqaBqPIUKm5fU3g8it1GX3#tT$':-234120010000,
                'IDLL$gBnziQMgSNb2ruoi3$UAuhrjGM$h5j$Xy$$':-341230130000,
                'IDLL$gD+KWSZ2Di69H7DC4+kRN2AbCbDrXy7utz$':-171390530000,
                'IDLL$gAdNsLRkSP7xy+R#xja$4zradCd#w4RFR$$':-50972270000,
                'IDLL$gA649CP$DgMrm0rbnr3NVEE0G0AP4d5ua3$':-211175400000,
                'IDLL$gCU3ug3wLfmHVTGAcf26cfCgGatNzmRKH$$':-242997460000,
                'IDLL$gBbiWLyj8jiR4n@#D$2DrtLH$+ohfua@hL$':-200000100000,
                'IDLL$gAGk$Za$YZkxeT2f1oPjpo2HW954yQp7GD$':-149999600000,
                'IDLL$gBy1N+LDIuFTnkHriQgidPnUEMVb9MfWMr$':-230120000000,
                'IDLL$gCrEhDsa9Wv$@x3QkNd4jbNcb5bISk8Nyv$':-99373170892,
                'IDLL$gBJs7+TLZ@n+Q1qsCtGy8Nn01Mi6MGEIAv$':-223910140000,
                'IDLL$gCbdIAe5LWM1Xb4IP9Byz+$V2To0AC9t$n$':-11159574900,
                'IDLL$gBm0hR+aPZvfX@bMMMQ6fL05oA0x6ea3f$$':-391829170010,
                'IDLL$gCc8Z7ftdddLmgr1TEo+3m2hFWXitIXyZ$$':-200000000000,
                'IDLL$gAHL+#rzvXvvR7Kb@0f23g+mDgiPs$D0TP$':-271289460000,
                'IDLL$gAz4X9PX0ULTHhA2AKXBi$LnxnP#jUbt9$$':-231289595100,
                'IDLL$gCK7s97a26cFRcoPbuUWwBeowhbuWC6zxz$':-341239000000,
                'IDLL$gA90tUrPr5eMCP4GDXCiWnu06B7AympBdj$':-6125280000,
                'IDLL$gAVIvJkcgYPJqEgZbLEdM6Ek7envuKahez$':-24815230000,
                'IDLL$gAfhsHT@9UN9f6st4XYAkCbFFLenC4+ECH$':-21314860000,
                'IDLL$gDYYE0NY6iInHF4Zpq0P4CNxxA61iqbQ8b$':-10516425,
                'IDLL$gDzXma7QQmI7fEUz3KvVZCv$ve@b6m8+GT$':-41234880000,
                'IDLL$gBSxkSLKMXKT6bhYt6NIFg263@dWT@SZmL$':-23104190000,
                'IDLL$gC5R8X7Gx+2Kb3bR@T88KtgJh5vkfbSj+T$':-32218700000,
                'IDLL$gBGMtzDgCbt2JhNSDpVaz7D7qkKFx8MhUf$':-108970000,
                'IDLL$gBbPs8Gv6JCz7@KxjQ3@H@xp8vh7MeGMyH$':-49461919,
                'IDLL$gA21Vt6kkRp5JAVmhyLpo3bSB6$booRp53$':-199999700000,
                'IDLL$gDV0fZ3mqyISBMkF8WgyahxGT6YaoFj+cr$':-573590000,
                'IDLL$gBHyCPzLYNgx8NzxKzbHyp38c9aa#jhjif$':-499700000,
                'IDLL$gCPV@HU$MuqSi7pNbpzmQ8QLVhpobEVu8T$':-499900000,
                'IDLL$gC3hRqSB0$uCVGnLXYWwjyTMbznac#VFRj$':-499700000,
                'IDLL$gAtVASM@IUcS1r2Su6qcCzIHLS6ieEZF$7$':-2000000000,
                'IDLL$gAm+yjRtQbFguheGcLXC+oYpTLiF8D4ahP$':-500000000,
                'IDLL$gA#iyA+7PiHD@rZAQBLvCL0cNiJ#83y9eX$':-383455980000,
                'IDLL$gBBJnCJCf4$c#LRuFzm@u9q@bev6XkpbJv$':-8422396,
                'IDLL$gCFnrZ+kQfaaorL1#k58bb$DmI2FuKpqGP$':-220000000000,
                'IDLL$gB17T@oR2wD8qD8+aMNby9MceJ9q2zJX@j$':-49999900000,
                'IDLL$gBkoyiZqay9@EEwVM9NB7E#e6tdU4Ihboz$':-7813948,
                'IDLL$gB@KqDwI08#5$o9otmP8KytRTL35MvNz8f$':-38361910,
                'IDLL$gBxMqjDJRYpme+dPx1J0I8uZqU9q425p$$$':-2894484,
                'IDLL$gDRMhq32+WmDtYeutjMDNQGXAUECYRnwFn$':-134500000,
                'IDLL$gB@Ip5RDeQTiWaBZ4J2#WJxSWLYCvn2Z4H$':-9874207,
                'IDLL$gC+Z$NBVyK7A89G8g@@EDdd7VT0f6xke2$$':-9999200000,
                'IDLL$gCffq7YwMMwj3vto7xgU#WZcgmApX+BGu3$':-16283673,
                'IDLL$gCH9+bhxX4ATZ9jIC0j7KE0Q89ITGywUuz$':-11940689,
                'IDLL$gA7FdyqTnFWFaxuL3FBgBci6od97UXddgv$':-2652756,
                'IDLL$gB0Zvmd$8AoLgVf4IcEEexx6F+PzARRPEr$':-132480720000,
                'IDLL$gAWq@bFDn+4XUZP+u$I1y+yWkt#q#Db7VD$':-127070780000,
                'IDLL$gAIWP7063NES4JCozjVVHz50MaGte+CY33$':-139012740000,
                'IDLL$gCWv43BYS3DSGnaW1KbZWBhrV8b4u7oTJ$$':-227311340000,
                'IDLL$gASKTKyJuhbJ8NFqGkQSsUo$c9KSwmxixX$':-139107740000,
                'IDLL$gBRMpicC7HBjFFGwC9v6o7MQ5ILAq40ovL$':-129860620000,
                'IDLL$gBSu7peg@KhCI3@wgWriPG@7dzYovZR3AD$':-161370120000,
                'IDLL$gB#TZVrt@DLNREsSLSRoJEI5xbLa6ddGCH$':-61322310000,
                'IDLL$gDN1JaxGDVqqohDJfko8VI6v$GrgGfr+Rr$':-137878070000,
                'IDLL$gDxzNVw2tDey9v2vboZdY5Q5V5U9nNGr+$$':-157418940000,
                'IDLL$gC8CCLVkxBrFSfbP7nCcVsKYxcZCp#vzP3$':-198234410000,
                'IDLL$gD1wFizfTDKrSo@mjDFbQYwz6Lhu#8tTEn$':-166896190000,
                'IDLL$gC0Sm11z5zWfLygx5ICIVFH1+0jHit$odf$':-70719220000,
                'IDLL$gDk6mMd8oDYzL$8DYt7Sz5J8vXztcjevDT$':-2500000000,
                'IDLL$gD33iHJfp@wvyK+W+pLWArtsnKULogvoFn$':-9533475,
                'IDLL$gD2RPbxY2aDdeARyTtbC4E4nK@Fwji@aKD$':-6999800000,
                'IDLL$gCGBGwcTpnaTr2@gio7yyrThvi+yTeVWB7$':-15000100000,
                'IDLL$gBQrCvn5Q@Tg@0HeVdMwhKy5LJ7nWy$M+f$':-15000000000,
                'IDLL$gCMj3A$FxVxKRhYG8vkt0EjQ0Z05dCokHr$':-4640568,
                'IDLL$gAhRhbz180ia0i$5yijVPjMNZD0YH9oouD$':-6870936,
                'IDLL$gDkcRvzFLCUJdrG1rW1xv4GHjmAsDZn2sf$':-9999900000,
                'IDLL$gBp4e0DK$E9C@MMwm4tZC@KhvhITJ4+MPr$':-5714629,
                'IDLL$gBL6Hn+e9YVI4cq+gsFSbHArT@Y23xFN1H$':-10000000000,
                'IDLL$gAArIuXCHU6a6xzTH6D7a4S$smI4P0NIxL$':-141231850000,
                'IDLL$gCi8L4Vaf8iP0MhunDuaRH@AUDo@nb7avX$':-179827160000,
                'IDLL$gDC6REUPFdRxThPbjx@YtW5Eaw9C0apEQf$':-19286740000,
                'IDLL$gCqDQ9st8FdEQG61ZA3PGy7Nj4z5QKcSqn$':-280000100000,
                'IDLL$gDSd+tpb$iSZJTEIgqUT0zMdEZYda$vE6f$':-157289120000,
                'IDLL$gDdhxx8vd@bjgysGD1$a$vV8Y#KZa3I$$v$':-7265890000,
                'IDLL$gDHJSnzd668fsD4yNhzv0j38ANzFbvB6vz$':-269999300000,
                'IDLL$gDmq72gmMouQwhAWDK+wjAyvvRRFZyJLCX$':-140281470000,
                'IDLL$gD3WudTLr4kSRITpGharqUjz1PP0hxvdI3$':-39284670000,
                'IDLL$gAc6rAn#H2CzzgjZDDdBf1yRNf4vApeRq3$':-56275890000,
                'IDLL$gDpXFWDI9mmmTuh37RVAR5FGWRR5#L3MnH$':-9999900000,
                'IDLL$gCagYVpZhzCQ9zcGidBAvwgTU48kSGb78v$':-173857280000,
                'IDLL$gAk$$iUsgo4IhXZhuRS5f8sLX5S2AqEE@b$':-120347280000,
                'IDLL$gAQ+3dz3VYaCjCp5P#e$1Soapn#Qk7LiZb$':-182934560000,
                'IDLL$gDEgfy8hR1qpYV@JSaX5XzFBUkxXIEI3dX$':-132560980000,
                'IDLL$gBI#Eyw1BgP1IRmkeTIUURG6IFiITmPbmv$':-119385290000,
                'IDLL$gB3pU9dauUiBF1IZvvo#ytNMjNWERPI9dr$':-151920590000,
                'IDLL$gBi6+938WxuV7h4La6tJfTe11oGXKEarxH$':-179347650000,
                'IDLL$gBmixTZVcniKeamnV5u2$sIRyqUVwDc00b$':-10000000000,
                'IDLL$gBSe9a603w6rAMmVL4sEmgd35RXaSL1F53$':-137829120000,
                'IDLL$gAhD9TsWRHNKYKJNqVhnUZ9BM0ewjW+Den$':-5000100000,
                'IDLL$gAYIX8zoFX$a7qDycXX72pGQvn47xt3fDT$':-239827480000,
                'IDLL$gAyQEB2Im2WFNGghyQjCHaDXBKDeZL8wNz$':-349998800000,
                'IDLL$gAGD8R+dUoBBawcbZz4KvTDB1CntfMT01H$':-172839430000,
                'IDLL$gDc6aQ9s2UzsDgDCCAozS0yko9g91nWpLb$':-6909445,
                'IDLL$gDRhRUNccBHdE@nAoCVDtRnZMzCfg+VJSP$':-20273860000,
                'IDLL$gDLLEm+$LoVe6#YVD1vKEzvL7Sn$@mEBs7$':-151220100000,
                'IDLL$gCNc4HDG$muyALFU2jQ#W6n8KfyqNGoIjn$':-151238510000,
                'IDLL$gDhutwWAiR1@6ve0Zx82HpSYDPJQ4Nym8b$':-5000100000,
                'IDLL$gDzUg9Cp1AnuS2VIuXryMc9w0cgunyXZo3$':-9999900000,
                'IDLL$gA$YdXWCFiysHfFk3Nx$kAK7ULWY2mNUP$$':-9999900000,
                'IDLL$gBF8G5jzL4VqGxRju$G$cqx5wGeCo@6jAn$':-9999900000,
                'IDLL$gA7npK@#CUjgJDXeN+mV1JBKE@x6HfX96z$':-10984480000,
                'IDLL$gC2KYkbfa75xubnfe@qWGxxI#ggteFPncr$':-14999700000,
                'IDLL$gBE#$v6NioM+Mv#wYttU2wA8r0XKFh$K8r$':-15799800000,
                'IDLL$gCgNEoB$pXIaLjaIVqBjToHu02zx66g$hn$':-14199800000,
                'IDLL$gC7syvQJkaBVEqTpPqFpZSeqybKg1yEDhX$':-14999800000,
                'IDLL$gDTuta10xebyc4hqIEofSvvviaVBxQPZmD$':-18000000000,
                'IDLL$gA1Pz3fdN1ij9B4Kyg6N88yT8xz8usp@iv$':-3000100000,
                'IDLL$gDv3YLjBxyQ#DRR$6f13g12d2BqXpbJxSD$':-23000000000
            },
            BLOCK_PROBLEM_DETECTED: 150940,
            GENESIS_ADDRESSES_CORRECTION: {
                FROM: {
                    ADDRESS: 'IDLL$gC9h7iFUURqhGUL23U@7Ccyb@X$2BCCpSH$',
                    BALANCE: 18674877890000
                },
                TO: {
                    ADDRESS: 'IDLL$gDZwjjD7ZE5+AE+44ITr8yo5E2aXYT3mEH$',
                    BALANCE: 18674856891922
                }
            }
        };

        let nInputSum  = 0;
        let nOutputSum = HARD_FORK_INFO.GENESIS_ADDRESSES_CORRECTION.TO.BALANCE;

        let aTransaction = {
            trx_id         : 'virtual_tx_' + HARD_FORK_INFO.BLOCK_NUMBER + '_1',
            isVirtual      : true,
            isConfirmed    : true,
            version        : 1,
            nonce          : 1,
            time_lock      : HARD_FORK_INFO.BLOCK_NUMBER - 1,
            from_length    : 0,
            to_length      : 0,
            fee            : 0,
            fee_raw        : 0,
            timestamp      : oBlockData['timestamp'],
            timestamp_UTC  : oBlockData['timestamp_UTC'],
            timestamp_block: oBlockData['timestamp_block'],
            timestamp_raw  : oBlockData['timestamp_block'],
            createdAtUTC   : oBlockData['createdAtUTC'],
            block_id       : oBlockData['block_id'],
            from           : {trxs: [], addresses: [], amount: 0, amount_raw: 0},
            to             : {trxs: [], addresses: [], amount: nOutputSum / IDLLCoins.IDLL, amount_raw: nOutputSum},
        };

        let i = 0;

        for (let sAddress in HARD_FORK_INFO.ADDRESS_BALANCE_REDUCTION) {
            aTransaction.from.trxs.push({
                trx_from_address   : sAddress,
                trx_from_pub_key   : 'pubKey_virtual_tx_' + HARD_FORK_INFO.BLOCK_NUMBER + '_1' + '_' + i,
                trx_from_signature : 'signature_virtual_tx_' + HARD_FORK_INFO.BLOCK_NUMBER + '_1' + '_' + i,
                trx_from_amount    : - HARD_FORK_INFO.ADDRESS_BALANCE_REDUCTION[sAddress] / IDLLCoins.IDLL,
                trx_from_amount_raw: - HARD_FORK_INFO.ADDRESS_BALANCE_REDUCTION[sAddress]
            });

            aTransaction.from.addresses.push(sAddress);

            nInputSum += - HARD_FORK_INFO.ADDRESS_BALANCE_REDUCTION[sAddress];

            ++i;
        }

        aTransaction.from_length = aTransaction.from.addresses.length;

        aTransaction.to.trxs.push({
            trx_to_address   : HARD_FORK_INFO.GENESIS_ADDRESSES_CORRECTION.TO.ADDRESS,
            trx_to_amount    : HARD_FORK_INFO.GENESIS_ADDRESSES_CORRECTION.TO.BALANCE / IDLLCoins.IDLL,
            trx_to_amount_raw: HARD_FORK_INFO.GENESIS_ADDRESSES_CORRECTION.TO.BALANCE
        });

        aTransaction.to.addresses.push(HARD_FORK_INFO.GENESIS_ADDRESSES_CORRECTION.TO.ADDRESS);
        aTransaction.to_length = aTransaction.to.addresses.length;

        aTransaction.from.amount     = nInputSum / IDLLCoins.IDLL;
        aTransaction.from.amount_raw = nInputSum;

        aTransaction.amount           = nInputSum / IDLLCoins.IDLL;
        aTransaction.amount_raw       = nInputSum;
        aTransaction.total_amount     = aTransaction.amount;
        aTransaction.total_amount_raw = aTransaction.amount_raw;

        oBlockData.trxs_number += 1;
        oBlockData.trxs.push(bIncludeTransactions ? aTransaction : aTransaction.trx_id);


        return oBlockData;
    }
}

export default BlockDataHardForksProcessor;
